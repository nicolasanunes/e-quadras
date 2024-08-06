import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { Repository } from 'typeorm';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ListCompanyDto } from './dto/list-company.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationEntity } from './entities/location.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  async createCompany(createCompany: CreateCompanyDto): Promise<object> {
    const location = await this.createSportsCourtLocation(
      createCompany.location,
    );

    const company: CreateCompanyDto = await this.companyRepository.save({
      name: createCompany.name,
      location: location,
    });

    return { message: `A Empresa ${company.name} foi criada!` };
  }

  listAllCompanies(): Promise<ListCompanyDto[]> {
    return this.companyRepository.find({
      relations: {
        location: true,
      },
    });
  }

  async updateCompany(
    id: number,
    updateCompany: UpdateCompanyDto,
  ): Promise<UpdateCompanyDto> {
    const updatedCompany = await this.companyRepository.findOneBy({ id });

    if (updatedCompany === null) {
      throw new NotFoundException('Empresa não encontrada!');
    }

    Object.assign(updatedCompany, updateCompany as CompanyEntity);

    return this.companyRepository.save(updatedCompany);
  }

  // Criar na tabela location com os endereços da quadra fornecidos no momento de criação da quadra
  async createSportsCourtLocation(
    createSportsCourtLocation: CreateLocationDto,
  ): Promise<LocationEntity> {
    return await this.locationRepository.save(createSportsCourtLocation);
  }
}
