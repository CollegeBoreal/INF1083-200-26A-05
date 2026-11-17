import { Component, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, View } from "@nativescript/core";

@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html",
    styleUrls: ["./browse.component.scss"],

    imports: [
        NativeScriptCommonModule
    ],

    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BrowseComponent implements OnInit {

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

    animate(view: any): void {
        const duration = 300;

        console.log("Animation started");

        view.animate({
            opacity: 0,
            duration: duration
        })
        .then(() => {
            console.log("1 - Opacity");

            return view.animate({
                opacity: 1,
                duration: duration
            });
        })
        .then(() => {
            console.log("2 - Translation");

            return view.animate({
                translate: {
                    x: 200,
                    y: 200
                },
                duration: duration
            });
        })
        .then(() => {
            return view.animate({
                translate: {
                    x: 0,
                    y: 0
                },
                duration: duration
            });
        })
        .then(() => {
            console.log("3 - Scale");

            return view.animate({
                scale: {
                    x: 5,
                    y: 5
                },
                duration: duration
            });
        })
        .then(() => {
            return view.animate({
                scale: {
                    x: 1,
                    y: 1
                },
                duration: duration
            });
        })
        .then(() => {
            console.log("4 - Rotation");

            return view.animate({
                rotate: 180,
                duration: duration
            });
        })
        .then(() => {
            return view.animate({
                rotate: 0,
                duration: duration
            });
        })
        .then(() => {
            console.log("Animation finished");
        })
        .catch((e) => {
            console.log("Animation error:", e.message);
        });
    }
}
