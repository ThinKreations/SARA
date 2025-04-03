import React from 'react';
import Head from "next/head";
import icon from "../public/favicon.ico";
export default function MainHead(props) {
    return ( // Debemos agregar el JWT 
        <div>
            <Head>
                <meta charset="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title> {props.title} </title>
                <link rel="shortcut icon" href={props.icon} />
            </Head>
        </div>
    )
}