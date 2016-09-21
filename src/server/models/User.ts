import { SQLModel } from 'chen/sql';

export class User extends SQLModel {

  protected table: string = 'users';
  protected fillable:string[] = ['user_email', 'password', 'first_name', 'last_name', 'city', 'country', 'phone', 'email_confirmation'];

}
