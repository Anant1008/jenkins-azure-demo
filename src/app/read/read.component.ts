import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Tutorial } from './../models/tutorial.model';
import { AppState } from './../app.state';
import * as TutorialActions from './../actions/tutorial.actions';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  tutorials: Array<Tutorial>;
  update:boolean[];
  value:string[];
  btnLabel:string[];

  // Section 2
  constructor(private store: Store<AppState>) {
    
  }

  deleteTutorial(index){
    this.store.dispatch(new TutorialActions.RemoveTutorial(index));
  }

  updateTutorial(index,btnRef,url){
    
    //console.log(this.tutorials[index]);
    //this.value=name;
    //this.store.dispatch(new TutorialActions.UpdateTutorial(index));

    console.log(btnRef);
    if(btnRef.value==='Edit'){
      this.update[index]=true;
      this.value[index]=this.tutorials[index].name;
      this.btnLabel[index]='Update'
    }

    else if(btnRef.value==='Update'){
      this.update[index]=false;
      //this.value[index]='';
      this.btnLabel[index]='Edit'
      this.store.dispatch(new TutorialActions.UpdateTutorial({obj:{name:this.value[index],url:url},index:index}));
    }
  }

  ngOnInit(): void {
    this.value=[];
    this.update=[];
    this.btnLabel=[];
    this.store.select('tutorial').subscribe(
      result=> {
        this.tutorials=<Tutorial[]>result;
        console.log(this.tutorials);
        for(let i=0;i<this.tutorials.length;i++){
          this.update[i]=false;
          this.btnLabel[i]='Edit';
          this.value[i]='';
        }
      }
    );
  }

}
