import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { from, Observable } from "rxjs";

@Controller()
export class MathController {

    @MessagePattern({ cmd: 'sum'})
    async accumulate(data: number[]):Promise<number> {
        return (data || []).reduce((a,b) => a+b)
    }

    @MessagePattern({ cmd: 'sum2'})
    accumulateObservable(data: number[]): Observable<number> {
        return from([1,2,3,4,5])
    }

    @EventPattern('user_created')
    async handleUserCreated(data: Record<string, unknown>) {
        console.log(data)
    }
}