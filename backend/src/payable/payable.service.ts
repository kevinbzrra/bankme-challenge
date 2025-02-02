import { Injectable } from "@nestjs/common";
import { Payable } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PayableService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllPayables() {
        return await this.prisma.payable.findMany({
            where: {
                deleted: false
            },
            include: {
                assignor: true
            }
        });
    }

    async getPayableById(id: string) {
        return await this.prisma.payable.findUnique({
            where: {
                id: id,
                deleted: false
            },
            include: {
                assignor: true
            }
        });
    }

    async createPayable(payable: Payable) {
        return await this.prisma.payable.create({
            data: {
                value: payable.value,
                assignorId: payable.assignorId
            }
        })
    }

    async updatePayable(payable: Payable) {
        return await this.prisma.payable.update({
            data: {
                value: payable.value,
                assignorId: payable.assignorId
            },
            where: {
                id: payable.id,
                deleted: false
            }
        })
    }

    async deletePayableById(id: string) {
        return await this.prisma.payable.delete({
            where: {
                id: id
            }
        });
    }

}