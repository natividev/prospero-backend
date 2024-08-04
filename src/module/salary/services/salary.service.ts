import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SalaryRepository } from '../repositories/salary.repository';
import { CreateAmountDto } from '../domain/dto/create-amount.dto';
import { SalaryDistributionStrategy } from '../strategies/salary-distribution.strategy';

@Injectable()
export class SalaryService {
  private strategy: SalaryDistributionStrategy;

  constructor(private readonly salaryRepository: SalaryRepository) {}

  setStrategy(strategy: SalaryDistributionStrategy) {
    this.strategy = strategy;
  }

  async distributeSalary(userId: number, amount: CreateAmountDto) {
    try {
      if (!this.strategy) {
        throw new Error('Strategy not set');
      }
      await await this.salaryRepository.distributeSalary(
        userId,
        amount,
        this.strategy,
      );

      return { message: 'Salario distribuido exitosamente' };
    } catch (error) {
      throw new InternalServerErrorException('Error al distribuir el salario');
    }
  }

  async createSalary(userId: number, amount: number) {
    try {
      await this.salaryRepository.createSalary(userId, amount);
      return { message: 'Salario creado exitosamente' };
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el salario');
    }
  }

  async distributeSalaryPrevious({ amount }: CreateAmountDto) {
    try {
      if (!this.strategy) {
        throw new Error('Strategy not set');
      }
      const distribution = this.strategy.distributeSalary(amount);
      return {
        message: 'Aquí está la previsualización de la distribución del salario',
        distribution,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al distribuir el salario');
    }
  }

  async getUserSalaryDetails(userId: number) {
    try {
      return await this.salaryRepository.getUserSalaryDetails(userId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los detalles del salario',
      );
    }
  }
}
