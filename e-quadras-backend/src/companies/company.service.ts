import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { Repository } from 'typeorm';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ListCompanyDto } from './dto/list-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  createCompany(createCompany: CreateCompanyDto): Promise<CreateCompanyDto> {
    const company = new CompanyEntity();

    Object.assign(company, createCompany as CompanyEntity);

    return this.companyRepository.save(company);
  }

  listAllCompanies(): Promise<ListCompanyDto[]> {
    return this.companyRepository.find();
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
}
