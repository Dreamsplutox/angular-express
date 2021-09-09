import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-vizjs-create',
  templateUrl: './vizjs-create.component.html',
  styleUrls: ['./vizjs-create.component.scss']
})
export class VizjsCreateComponent implements OnInit, OnDestroy {
  create_choice = null;
  choices = [
     { id:"dashboard", name: "dashboard", url: "dashboard/designer.html" },
    { id:"adhocFlow", name: "adhoc", url: "flow.html?_flowId=adhocFlow" }
  ];
  iframe_height = Math.round($(window).height() * 0.80);
  iframe_width = Math.round($(window).width() * 0.90);
  iframe_margin_top = Math.round($(window).height() * 0.05); 

  constructor(private authService: AuthService, private router: Router, private zone: NgZone) { }

  ngOnInit() {
    console.log("ngOnInit func");
    var instance = this;
  }

  ngOnDestroy(){
    console.log("Destroy vizjs-create component");
  }

  //function to get the creation choice of the user (dashboard / adhoc) 
  onCreateChoice(form: NgForm) {
    //get the choice
    for(var i = 0; i< this.choices.length; i++){
      if(this.choices[i]["id"] == form.value["input_create_choice"]){
        this.create_choice = this.choices[i];
      }
    }

    if(this.create_choice == null){
      alert("failed to get the selected value");
    }else{
      console.log("form val = "+this.create_choice);
      
      //hide the form
      $("#create_choice_div").css("display", "none");

      //build the iframe and insert it in html page
      // http://localhost:8080/jasperserver-pro/dashboard/designer.html
      // http://localhost:8080/jasperserver-pro/flow.html?_flowId=adhocFlow
      var iframe_src = "https://srvreporting.arnaudjasper2.tk:8443/jasperserver-pro/"+this.create_choice["url"];
      var iframe_elt = "<iframe id='create_iframe' title='vizjs create' src='"+iframe_src+"></iframe>";
      var iframe_control =  $(iframe_elt);
      iframe_control.appendTo("#iframe_div");

      $('<iframe>')                      // Creates the element
      .attr('src',iframe_src) // Sets the attribute spry:region="myDs"
      .attr('height',this.iframe_height)
      .attr('width',this.iframe_width)
      .addClass("iframe-class")
      .css("display", "inline-block")
      .css("resize", "both")
      .css("overflow", "auto")
      .css("margin-top",this.iframe_margin_top)
      .appendTo('#iframe_div');

      //show the reinit button (OPTIONAL) 

      //on window resize, update the iframe size
      $(window).on('resize', function(){
        console.log("resize");
        this.iframe_height = Math.round($(window).height() * 0.80);
        this.iframe_width = Math.round($(window).width() * 0.90);
        this.iframe_margin_top = Math.round($(window).height() * 0.05); 
        $(".iframe-class")
        .attr('height',this.iframe_height)
        .attr('width',this.iframe_width)
        .css("height", this.iframe_height)
        .css("width", this.iframe_width)
        .css("margin-top",this.iframe_margin_top);
      });
    }
  }



}
