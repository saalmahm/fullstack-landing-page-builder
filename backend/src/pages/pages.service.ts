import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from './page.entity';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<Page>,
  ) {}

  async create(createPageDto: any): Promise<Page> {
    const page = new this.pageModel(createPageDto);
    return page.save();
  }

  async findAll(skip: number = 0, limit: number = 10, sort: string = 'updatedAt'): Promise<{ pages: Page[], total: number }> {
    const query = this.pageModel.find()
      .sort({ [sort]: -1 })
      .skip(skip)
      .limit(limit);

    const [pages, total] = await Promise.all([
      query.exec(),
      this.pageModel.countDocuments().exec()
    ]);

    return { pages, total };
  }

  async search(query: string, skip: number = 0, limit: number = 10): Promise<{ pages: Page[], total: number }> {
    const searchQuery = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { components: { $regex: query, $options: 'i' } }
      ]
    };

    const [pages, total] = await Promise.all([
      this.pageModel.find(searchQuery)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.pageModel.countDocuments(searchQuery).exec()
    ]);

    return { pages, total };
  }

  async findOne(id: string): Promise<Page> {
    const page = await this.pageModel.findById(id).exec();
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

  async update(id: string, updatePageDto: any): Promise<Page> {
    const page = await this.pageModel.findByIdAndUpdate(
      id,
      updatePageDto,
      { new: true }
    ).exec();

    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }

    return page;
  }

  async remove(id: string): Promise<void> {
    const result = await this.pageModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
  }
}
