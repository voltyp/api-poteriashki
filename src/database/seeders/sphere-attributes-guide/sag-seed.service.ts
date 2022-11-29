import { InjectRepository } from '@nestjs/typeorm';
import { SphereAttributesGuide } from '@/sphere-attributes-guide/entities/sphere-attributes-guide.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SAGSeedService {
  constructor(
    @InjectRepository(SphereAttributesGuide)
    private readonly SAGRepository: Repository<SphereAttributesGuide>,
  ) {}

  async run() {
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Авто',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Бухгалтер',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Волонтер',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Все вопросы',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Выкармливание щенко/котят',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Группа немедленного реагирования',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Дизайнер',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Директор фонда',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Директор фонда',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Координатор группы пиара',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор беременных кошек',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор британских кошек',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор вновь поступивших кошек',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор горячей линии',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор домашних передержик кошек',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор здоровых котят',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор здоровых собак',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор котят на карантине',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор кошек на карантине',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор массовой стерилиазции',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор новорожденных котят и кормящих кошек',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор передержек кошек',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор передержек породистых собак',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор печатной продукции',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор района',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор сайта',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор сфинксов',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор уличной передержки собак',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор фотографов',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор экстренных и травмированных кошек',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Куратор экстренных и травмированных собак',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Передержка — собаки',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Передержка — кошки',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Председатель Совета Фонда',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Прием помощи от населения',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Руководитель направления ОСВ',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Творчество волонтеров "Потеряшек"',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Учредитель фонда',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Финансовый куратор',
        comments: '',
      }),
    );
    await this.SAGRepository.save(
      this.SAGRepository.create({
        name: 'Фотограф',
        comments: '',
      }),
    );
  }
}
