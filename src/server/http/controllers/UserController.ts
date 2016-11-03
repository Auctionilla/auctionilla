import { Controller, Request, Response } from 'chen/web';
import { injectable, Hash, _ } from 'chen/core';
import { FavoriteService, SearchAlertsService, UserService, MandrillService } from 'app/services';

const moment = require('moment')

@injectable
export class UserController extends Controller {

  constructor(private favoriteService: FavoriteService, private searchAlertService: SearchAlertsService, private userService: UserService, private mandrillService: MandrillService) {

    super();
  }

  public async index(request: Request, response: Response) {
    return response.render('index');
  }

  public async viewLogin(request: Request, response: Response ): Promise<any> {
    if (request.session.get('loggedUser')) {
      let user = request.session.get('loggedUser').id;
      if (user) {
        return response.redirect('/')
      }
    }
    return response.render('login');
  }

  public async registration(request: Request, response: Response): Promise<any> {
    if (request.session.get('loggedUser')) {
      return response.redirect('/')
    }

    let user;
    if (request.session.get('loggedUser')) {
      user = request.session.get('loggedUser').id;
    }
    return response.render('register', { user });
  }

  public async viewProfile(request: Request, response: Response) {
    // if (request.session.get('updateAlert')) {
    //     var testing = request.session.flash('updateAlert');
    //     console.log('testing lang kung ma reretain', testing)
    //   }
    return response.render('profile');
  }

  public async viewAllAlerts(request: Request, response: Response) {
    let offset = 1;
    let limit = 10;
    if (request.input.get('offset')) {
      offset = request.input.get('offset')
    }
    if (request.input.get('page')) {
      limit = request.input.get('page')
    }

    if (request.session.get('loggedUser')) {
     console.log ('user.id');
     console.log (request.session.get('loggedUser').id);
     let id = request.session.get('loggedUser').id;
     if (request.session.get('updateAlert')) {
        request.session.flash('updateAlert');
      }
      if (id) {

        let allSearchAlerts = await this.searchAlertService.viewAllSearchAlerts(id, (offset - 1) * limit, limit);
        let allAlerts = [];

          allSearchAlerts.forEach(item => {
            let allJson = item.toJSON();
            allAlerts.push(allJson);
          });
          console.log(allAlerts)

          let gettotal = await this.searchAlertService.countSavedSearch(id)
          let total = gettotal.get('totalSearch')
        return response.render('allmysearchalerts', { all : allAlerts , offset, limit, total })
      }
    }
  }

  public async viewAllFavorite(request: Request, response: Response) {
    let id;
    let limit = 10;
    let offset = 1;
    if (request.session.get('loggedUser')) {
      id = request.session.get('loggedUser').id;

    }
    if (request.session.get('updateAlert')) {
          request.session.flash('updateAlert');
        }
    let getoffset = request.input.get('offset');
    if (getoffset) {
      offset = parseInt(getoffset);;
    }
    let getlimit = request.input.get('limit');
    if (getlimit) {
      limit = parseInt(getlimit);
    }

    console.log('the data', id, offset , limit)
    let allMyFavorite = await this.favoriteService.viewFavorites(id, (offset - 1 ) * limit, limit);
    let myfavorite = [];
    allMyFavorite.forEach(item => {
      let jsondata = item.toJSON();
      myfavorite.push(jsondata);
    });

    myfavorite.forEach(async(data) => {
      let timeremaining = await this.getRemainingHours(String(data['auction_date']), parseInt(data['id']))
      data['timeremaining'] = timeremaining;
    });

    console.log('this is the data', myfavorite);
    let totalFavorite = await this.favoriteService.countFavorites(id)
    let total = totalFavorite.get('totalFav')
    return response.render('allmyfavorites', { myfavorite, total, user: id, offset, limit });
  }


  public async register(request: Request, response: Response) {
    // let email = await Hash.make('cedrickbuan@gmail.com');
    // console.log(email);
    // let password = await Hash.check('cedrickbuan@gmail.com', await email);
    let user;
    if (request.session.get('loggedUser')) {
      user = request.session.get('loggedUser').id;
      console.log('the logged user id')
      console.log(user)
    }

    let formPass1 = request.input.get('pass')
    let formPass2 = request.input.get('pass2')
    let formEmail = request.input.get('email')

    if (String(formPass1).length < 6) {
      return response.render('register', {alert: 'password too short', user})
    }
    if (formPass1 != formPass2) {
      return response.render('register', {alert: 'password not match', user})
    }
    let activation;
    let alert = '';
    let hashedpass = await Hash.make(formPass1);
    console.log(hashedpass);
    let hashedemail = await Hash.make(formEmail);
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
      // =============email reactivation ========================
      // let chkifnotactive = checkIfexistEmail.get('is_active');
      // if (chkifnotactive == false) {
      //   console.log('this is not active')
      //   if (Hash.check(formPass1, checkIfexistEmail.get('password'))) {
      //     console.log('not active pass match')
      //     let activate = await this.userService.reactivateMyAccount(formEmail)
      //     if (activate) {
      //       activation = 'activated';
      //     }
      //   }
      // }
      //=========================================================
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
                  <td bgcolor="#EB7035" style="padding: 12px 18px 12px 18px; -webkit-border-radius:3px; border-radius:3px" align="center"><a href="${this.context.baseUrl(`/verify-account/${base64email}/${id}`)}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none; display: inline-block;">Click Here. &rarr;</a></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>`;
        this.mandrillService.send('Verify Email', msg, [{ email: email }], '');
        //this.mandrillService.test(msg);
        alert= "email sent";
      }
    }
    //return response.redirect('/');
    // return response.json({ data: {status: 'success'} });
    return response.render('register', { alert, user, activation})

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
        let chkIfActive = userDetails.get('is_active')
        if (chkIfActive == false) {
          return response.json({data : {alert : 'Account is already Deactivated, Please register the email to reactivate.' }});
        }
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
    if (request.session.get('updateAlert')) {
      request.session.flash('updateAlert');
    }
    return response.redirect('/');
  }

  public async viewSearchAlertAndFavorites(request: Request, response: Response): Promise<any> {


   if (request.session.get('loggedUser')) {
     console.log ('user.id');
     console.log (request.session.get('loggedUser').id);
     let id = request.session.get('loggedUser').id;

    if (id) {
      let searchAlertOffset = 1;
      let searchAlertLimit = 10;
      console.log('view alerts')
      let searchAlerts = await this.searchAlertService.viewSearchAlerts(id, (searchAlertOffset - 1) * searchAlertLimit, searchAlertLimit);
      let alert = [];
      let countSearch = await this.searchAlertService.countSavedSearch(id);
      let totalSearch = countSearch.get('totalSearch');
      console.log(totalSearch, 'THIS IS THE TOTAL SEARCH');
      searchAlerts.forEach(item => {
        let searchAlertJsonItem = item.toJSON();
        alert.push(searchAlertJsonItem);
      });

      let favOffset = 1;
      let favLimit = 5;
      
      let fav = [];
      let countFav = await this.favoriteService.countFavorites(id);

      let totalFav = countFav.get('totalFav');
      console.log(totalFav, 'THIS IS THE TOTAL Favorites');
      let favorites = await this.favoriteService.viewFavorites(id, (favOffset - 1) * favLimit, favLimit);
      favorites.forEach(item => {
        let favoriteJsonItem = item.toJSON();
        // console.log('this is my favorite', favoriteJsonItem);
        fav.push(favoriteJsonItem);
      });
      fav.forEach(async(data) => {
        let timeremaining = await this.getRemainingHours(String(data['auction_date']),data['id'])
        if (data['days_remaining'] < 0) {
          console.log('this should be removed from favorites', data['favId'])
          let removefromfav = await this.favoriteService.destroy(parseInt(data['favId']))
          if (removefromfav) {
            console.log('this favitem is deleted', data['favId'])
          }
        }
        data['timeremaining'] = timeremaining;
      });
      //==================== get all the items again to but realized is removed ==================
      // let fav2 = []
      // let favorites2 = await this.favoriteService.viewFavorites(id, (favOffset - 1) * favLimit, favLimit);
      // favorites2.forEach(item => {
      //   let favoriteJsonItem = item.toJSON();
      //   // console.log('this is my favorite', favoriteJsonItem);
      //   fav2.push(favoriteJsonItem);
      // });
      // fav2.forEach(async(data) => {
      //   let timeremaining = await this.getRemainingHours(String(data['auction_date']),data['id'])
      //   data['timeremaining'] = timeremaining;
      // });
      //==========================================================================================


      let getUpdate = await this.userService.getUserUpdate(id);
      let info = [];

      getUpdate.forEach(item => {
        let updateJson = item.toJSON();
        info.push(updateJson);
      });
      console.log(fav);
      let alertpassupdate;
      let alertuserupdate;
      if (request.session.get('updateAlert')) {
        alertuserupdate = request.session.flash('updateAlert').alertuser
      }
      if (request.session.get('passAlert')) {
        alertpassupdate = request.session.flash('passAlert').alertpass
      }
      console.log('this is the user alert' ,alertpassupdate , alertuserupdate )

      ////=============================update user here==========================================



      ///===================================update user end =====================================




      return response.render('profile', { favLimit, searchAlertLimit, totalFav, totalSearch, searchAlert: alert, favorites: fav, update : info, alertpassupdate, alertuserupdate });
      }
    } else {
      return response.redirect('/login');
    }
   }

  public async updateUserPost(request: Request, response: Response): Promise<any> {
    let alertuser;
    let alertpass;
    if (request.session.get('loggedUser')) {
     console.log ('user.id');
     console.log (request.session.get('loggedUser').id);
     let id = request.session.get('loggedUser').id;

      if (id) {



        let data = {
          first_name : request.input.get('firstname'),
          last_name : request.input.get('lastname'),
          city : request.input.get('city'),
          country : request.input.get('country'),
          phone : request.input.get('phone')

        }

        console.log(data, id)
            let newPassword = request.input.get('newpassword');
            console.log(newPassword)
            if (newPassword) {
              let oldPassDB = await this.userService.getOldPassword(id);
              console.log(oldPassDB.get('password'));

              if (String(newPassword).length < 6) {
                alertpass = 'Password too short!'
                request.session.set('updateAlert', { alertuser })
                request.session.set('passAlert', { alertpass })
                return response.redirect('/viewprofile')
              }

              let oldPassInput = request.input.get('oldpassword');

              if (oldPassInput) {
                let check = await Hash.check(oldPassInput, String(oldPassDB.get('password')));
                console.log('check?', check)
                if (check) {
                  console.log(oldPassDB)
                  console.log ('old password matched!')
                  let confirmNewPassword = request.input.get ('confirmnewpassword');
                  if (newPassword == confirmNewPassword) {
                    console.log('password matched!');
                    alertpass = 'Password successfully updated.';
                    console.log(newPassword);
                    let newHashPassword = await Hash.make(newPassword);
                    data['password'] = newHashPassword;
                    console.log(newHashPassword)
                    console.log(data);

                  } else {
                    console.log ('Password confirmation did not matched!');
                    alertpass = 'Password did not match!';
                    request.session.set('updateAlert', { alertuser })
                    request.session.set('passAlert', { alertpass })
                    return response.redirect('/viewprofile')
                    //return response.redirect('/viewprofile');
                  }
                } else {
                  console.log('Re-enter old password')
                  alertpass = 'Old password incorrect!';
                  request.session.set('updateAlert', { alertuser })
                  request.session.set('passAlert', { alertpass })
                  return response.redirect('/viewprofile')
                  //return response.redirect('/viewprofile');
                }
              } else {
                console.log('Please enter your old password!')
                alertpass = 'Please enter your old password';
                request.session.set('updateAlert', { alertuser })
                request.session.set('passAlert', { alertpass })
                return response.redirect('/viewprofile')
                //return response.redirect('/viewprofile');
              }
            }
        let update = await this.userService.updateUser(id, data);
        if (update) {
          alertuser = 'Successfully updated your account'

          console.log('update', alertuser, alertpass )
          request.session.set('updateAlert', { alertuser })
          request.session.set('passAlert', { alertpass })

        }

      }
    }
    //end of function
    return response.redirect('/viewprofile');
  }

  public async deleteAccount(request: Request, response: Response){
    // let a = request.param.get('id');
    let userId = request.param('id');
    console.log(userId, 'user id')

    let removeAccount = await this.userService.destroy(parseInt(userId));
    if (removeAccount) {
      console.log('account removed')
    }
    return response.redirect('/');
  }

  public async getRemainingHours(rawdate, id?: number) {
    let hrnow = new Date();
    let timenow = moment().format('HH')
    console.log('the time now by moment', timenow, rawdate, id)
    console.log('this is a date too')
    let thistime = hrnow.getUTCHours();
    console.log(thistime)
    let splitdate = String(rawdate).split(' ');
    let gethrsmin = splitdate[1];
    let gethr = gethrsmin.split(':')
    let thehr = parseInt(gethr[0]);

    let remaining = thehr - timenow;
    console.log(timenow, thehr, remaining)
    if (remaining > 0) {
      return remaining;
    } else if (remaining < 0) {
      console.log('this item should be in realized:', id)
      // let toRealized = await this.auctionItemService.updateToRealized(id);

      // if (toRealized) {
      //   console.log('item updated to realized:', id)
      // }
      return 0;
    } else {
      return 0;
    }

  }

  public async deleteMyAccount(request: Request, response: Response) {
    let id;
    if (request.session.get('loggedUser')) {
      id = request.session.get('loggedUser').id;

    }
    console.log('the user id to deactivate:', id);
    // let deactivate = await this.userService.deactivateMyAccount(id)
    // if (deactivate) {
    //   console.log('deactivated your account')
    //   request.session.flash('loggedUser');
    // } else {
    //   console.log('deactivation failed')
    // }

    return response.redirect('/login');
  }
}
