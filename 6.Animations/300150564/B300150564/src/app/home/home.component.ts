import { Component, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],

    imports: [
        NativeScriptCommonModule
    ],

    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}