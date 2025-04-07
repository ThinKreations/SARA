import React from 'react';
import Head from "next/head";
import icon from "../public/favicon.ico";

export default function MainHead(props) {
    return (
        <Head>
            <meta charSet="UTF-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{props.title}</title>
            <link rel="shortcut icon" href={props.icon || icon.src} />
            <script src="https://cdn.rawgit.com/LazarSoft/jsqrcode/master/src/qr_packed.js"></script>
        </Head>
    );
}