import { Post } from "../entities/Post";

interface ICreatePostDTO {
  description: string;
  user_id: string;
  url_img: string;
}

// interface IUpdateUserDTO {
//   id: string;
//   name?: string;
//   email?: string;
//   password: string;
// }

interface IUpdatePostDTO {
  id: string;
  description: string;
  url_img: string;
}

interface IDeletePostDTO {
  id: string;
  user_id: string;
}

interface IPostRepository {
  store({ description, url_img }): Promise<Post>;
  // listAll(): Promise<Post[]>;
  // get(id: string): Promise<Post>;
  // // findByEmail(email: string): Promise<User>;
  // findById(id: string): Promise<Post>;
  // update({ id, name, email, password }): Promise<Post>;
  // delete(id: string): Promise<void>;
  // someFieldIsEmpty(post: Post): boolean;
}

export { IPostRepository, ICreatePostDTO, IUpdatePostDTO, IDeletePostDTO };
