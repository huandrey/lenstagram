import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../errors/AppError";
import { delay } from "../../../../utils/delay";
import { Post } from "../../entities/Post";
import {
  IPostRepository,
  ICreatePostDTO,
  IUpdatePostDTO,
} from "../IPostRepository";

export class PostRepository implements IPostRepository {
  private repository: Repository<Post>;

  constructor() {
    this.repository = getRepository(Post);
  }

  async store({
    description,
    user_id,
    url_img,
  }: ICreatePostDTO): Promise<Post> {
    const dataPost = this.repository.create({
      description,
      user_id,
      url_img,
    });

    try {
      const post = await this.repository.save(dataPost);

      return post;
    } catch (err) {
      throw new AppError("Something went wrong!");
    }
  }

  async update({ id, description, url_img }: IUpdatePostDTO): Promise<Post> {
    const [[updatedPost]] = await this.repository.query(
      `
      UPDATE posts
      SET description = $1, url_img = $2, updated_at = now()
      WHERE id = $3
      RETURNING *
    `,
      [description, url_img, id]
    );
    return updatedPost;
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (err) {
      throw new AppError("Something went wrong!");
    }
  }

  async findPostById(id: string): Promise<Post> {
    const post = await this.repository.findOne(id);

    return post;
  }

  async findAllPostsByUser(id: string): Promise<Post> {
    await delay(2000);
    const posts = await this.repository.query('SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC', [id]);
    return posts;
  }

  async findAllPosts(): Promise<Post> {
    await delay(2000);
    const posts = await this.repository.query('SELECT * FROM posts ORDER BY created_at DESC');
    return posts;
  }
}
