export class Task {
  id: number;
  username: string;
  email: string;
  text: string;
  status: number;
  image:string;
  image_path: string;

  constructor(id:number, username:string, email:string, text:string, status:number, image_path:string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.text = text;
    this.status = status;
    this.image_path = image_path;
  }
}
