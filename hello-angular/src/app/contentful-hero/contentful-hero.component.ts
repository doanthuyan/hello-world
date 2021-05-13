import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../contentful.service';
import { Entry } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
@Component({
  selector: 'app-contentful-hero',
  templateUrl: './contentful-hero.component.html',
  styleUrls: ['./contentful-hero.component.css']
})
export class ContentfulHeroComponent implements OnInit {



  private contentfulHeros: Entry<any>[] = [];

  constructor(private contentfulService: ContentfulService) { }
  _returnHtmlFromRichText(richText) {
     if (richText === undefined || richText === null || richText.nodeType !== 'document') {
       return '<p>Error</p>';
     }
     return documentToHtmlString(richText);
 }
  // fetch data on init
  ngOnInit() {
    this.contentfulService.getProducts()
    .then(products => this.contentfulHeros = products)
  }
}
