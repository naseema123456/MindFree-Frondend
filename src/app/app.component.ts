import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public str=""
  public count=0
  public evenorodd="even"
  public counts=0
  public string=""
  public is_hidden=true
  title = 'project-name';
  data={
    tech1:'Angular',
    tech2:'Node.js',
    programmingLang:'javaScript'
  }
  colourFunction(){
    return "green"
  }
  
  functionclick(){
    console.log("click");
    this.str="good morning"
  }
  functionclick2(){
    this.str="good evening"
  }
  decreament(){
// this.count=this.count-1
this.count-=1
if(this.count%2==0){
this.evenorodd="even"
}else{
  this.evenorodd="odd"
}
  }
  increament(){
    // this.count=this.count+1
    this.count+=1
    if(this.count%2==0){
      this.evenorodd="even"
      }else{
        this.evenorodd="odd"
      }
  }
  check(){
    if(this.counts%2==0){
      this.string="even"
    }else{
      this.string="odd"
    }
  }
}
