import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { timeout, reduce, map } from 'rxjs/operators'

@Controller('math')
export class MathController {  

  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy
  ) {}

  @Get()
  getHello(): string {
    return 'opa'
  }

  @Get('sum')
  getSum() {    
    return 1
  }

  @Get('accumulate')
  accumulate() {
    const pattern = {cmd: 'sum'}
    const payload = [1,2,3,4]
    return this.client.send(pattern, payload)
      .pipe(timeout(5000))
      .toPromise()
  }

  @Get('accumulateObservable')
  accumulateObservable() {
    const pattern = {cmd: 'sum2'} 
    let soma = 0   
    return this.client.send(pattern, {})
      .pipe(
        reduce((a, v) => {
          console.log(a, v)
          return a +v
        }),
        map(data => {
          console.log('data', data)
          return data
        })
      ).toPromise() 
  }

  @Get('publish')
  async publish() {    
    const result = this.client.emit<number>('user_created', {name: 'test'});    
  }
}