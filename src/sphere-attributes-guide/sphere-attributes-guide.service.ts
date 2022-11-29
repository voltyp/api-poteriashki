import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SphereAttributesGuide } from '@/sphere-attributes-guide/entities/sphere-attributes-guide.entity';
import { CreateDto, UpdateDto } from '@/sphere-attributes-guide/dto';

@Injectable()
export class SphereAttributesGuideService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(SphereAttributesGuide)
    private readonly SAGRepository: Repository<SphereAttributesGuide>,
  ) {}

  async getAllSAGs(): Promise<SphereAttributesGuide[]> {
    return await this.SAGRepository.find();
  }

  async createSAG(data: CreateDto): Promise<SphereAttributesGuide> {
    const value = this.SAGRepository.create(data);
    await this.SAGRepository.save(value);

    return value;
  }

  async updateSAG(data: UpdateDto): Promise<SphereAttributesGuide> {
    await this.SAGRepository.update(data.id, data);
    return await this.SAGRepository.findOneOrFail({
      where: { id: data.id },
    });
  }

  async deleteSag(id: number): Promise<void> {
    const sag = await this.SAGRepository.findOneBy({ id });

    if (!sag) {
      throw new NotFoundException('Аттрибут не найден');
    }

    await this.SAGRepository.remove(sag);
  }
}
