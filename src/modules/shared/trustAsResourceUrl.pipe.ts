import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'trustAsResourceUrl'})
export class trustAsResourceUrlPipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}
  transform(url: string) {
    let sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
		return sanitizedUrl;
  }
}