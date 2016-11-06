import { Controller, Request, Response } from 'chen/web';
import { injectable, Hash, _ } from 'chen/core';
import { UserService, MandrillService } from 'app/services';


@injectable
export class UserController extends Controller {

  constructor(private userService: UserService, private mandrillService: MandrillService) {
    super();
  }

  public async index(request: Request, response: Response) {
    return response.render('index');
  }

  public async viewLogin(request: Request, response: Response ) {

    let id = 0;
    if (request.session.get('loggedUser')) {
      id = request.session.get('loggedUser').id;
    }
    return response.render('login', { id });
  }

  public async registration(request: Request, response: Response) {
    let id = 0;
    if (request.session.get('loggedUser')) {
      id = request.session.get('loggedUser').id;
    }
    return response.render('register', { id });
  }



  public async register(request: Request, response: Response) {
    // let email = await Hash.make('cedrickbuan@gmail.com');
    // console.log(email);
    // let password = await Hash.check('cedrickbuan@gmail.com', await email);
    let alert = '';
    let hashedpass = await Hash.make(request.input.get('pass'));
    console.log(hashedpass);
    let hashedemail = await Hash.make(request.input.get('email'));
    let email = request.input.get('email');
    let checkIfexistEmail = await this.userService.checkEmail(email);
    let base64email = Buffer.from(hashedemail).toString('base64');
    console.log('base64 email')
    console.log(base64email);
    let userDetails = {
      email:  email,
      code:  base64email,
      password: hashedpass
    }
    if (checkIfexistEmail) {
      console.log('email already exist');
      alert = 'email exist';
      // return response.render('register', { alert: 'email exist' })
    } else {
      let registerUser = await this.userService.createUser(userDetails);
      if (registerUser) {
        console.log('user is registered');
        let getUserId = await this.userService.checkEmail(email);
        let id = getUserId.get('id');
        console.log('this is the clean email');
        console.log(id);
        console.log('this is the clean hash');
        console.log(_.replaceAll(hashedemail, '/', ''));
        console.log('saved!')
        let msg = `
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <h1> Thank You for registering to www.auctionilla.com <h1>
        <h3>Please click here to verify account </h3>
          <tr>
            <td>
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td bgcolor="#EB7035" style="padding: 12px 18px 12px 18px; -webkit-border-radius:3px; border-radius:3px" align="center"><a href="http://localhost:3000/verify-account/${base64email}/${id}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none; display: inline-block;">Click Here. &rarr;</a></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>`;

        this.mandrillService.send('Verify Email', msg, [{ email: email }], '');
        alert= "email sent";
      }
    }
    //return response.redirect('/');
    // return response.json({ data: {status: 'success'} });
    return response.render('register', { alert })

  }


  public async verifyAccount(request: Request, response: Response) {
    let verificationCode = request.param('verification_code');
    let registrationId = request.param('id');
    let getEmail = await this.userService.getOneBy('id',registrationId);
    let hashedEmail = await Hash.make(getEmail.get('email'))
    let chkhash = await Hash.check('cedrickbuan@gmail.com',hashedEmail);
    console.log(chkhash);
    console.log('saved Verification code:');
    console.log(getEmail.get('validation_code'));
    console.log('this is the hashed email')
    console.log(getEmail.get('email'));
    console.log('this is the verification code:');
    console.log(verificationCode);
    console.log('and this is the user id :');
    console.log(registrationId);
    if (verificationCode == getEmail.get('validation_code')) {
      console.log('the two are identical');
      let verifiy = await this.userService.verifyUser(registrationId);
      if (verifiy) {
        console.log('user verified');
        request.session.set('loggedUser',{'email': getEmail.get('email'), 'id': getEmail.get('id')});
        request.session.get('loggedUser');
      }
    }
    return response.redirect('/');
    //return { data: { alert:'user registered'}}
  }

  public async login(request: Request, response: Response) {
    let email = request.input.get('email');
    let pass  = request.input.get('password');
    console.log(email);
    console.log(pass);
    let loginstatus = "";
    let chkEmail = await this.userService.checkEmail(email);
    if (chkEmail) {
      console.log('email is registered');
      let userDetails = await this.userService.getOneBy('email', email);
      if (userDetails) {
        console.log('user details found');
        let chkIfVerified = userDetails.get('email_confirmed');
        if (chkIfVerified == true) {
          console.log('user is verified');
          let userpass = userDetails.get('password');
          console.log(userpass);
          let checkPass = await Hash.check(pass, userpass);

          if (checkPass) {
            console.log('User is registered, login ok!');
            loginstatus = 'Login success';

            request.session.set('loggedUser',{'email': userDetails.get('email'), 'id': userDetails.get('id')});
            request.session.get('loggedUser');
            //response.redirect('/search')
          } else {
            console.log('user is not registered');
            loginstatus = 'Password not match, login failed';
          }
        } else if (chkIfVerified == false) {
          console.log('user is not yet verified');
          loginstatus = 'Please verify your account first';
        }

      } else {
        console.log('user details not found');
        loginstatus = 'Password not match';
      }


    } else {
      console.log('unknown email')
      loginstatus = "User is not registered";
    }
    return response.json({data : {alert : loginstatus }});

  }


  public async logout(request: Request, response: Response) {
    request.session.flash('loggedUser');
    return response.redirect('/');
  }




}
