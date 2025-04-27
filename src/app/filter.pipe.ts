import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'filter',
  standalone: false
})
export class FilterPipe implements PipeTransform {

  transform(value?: any, args?: any): any {
    if(!value)
      return null;
    if(!args)
      return value;
    // return null;

  
//   args=args.toLowerCase();
//  console.log("args"+args)
// //  console.log("value=="+value)
//   return value.filter(
//     function(item:any){
//       // return item.toLowerCase().includes(args)
//     return JSON.stringify(item).toUpperCase().includes(args);
//   });
args = args.toLowerCase();
return value.filter((item: any) => {
  return JSON.stringify(item).toLowerCase().includes(args);
});
  }

}
