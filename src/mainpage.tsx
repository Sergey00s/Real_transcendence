import { request } from "http";
import { env } from "process";
import React, { Component, useRef } from"react";
import { getEnvironmentData } from "worker_threads";


class MainPage extends Component
{

    private LoginCheck: React.RefObject<HTMLButtonElement>;
    private endpoint: string = process.env.REACT_APP_ENDPOINT as string;
    constructor(props: any) {        
        super(props);
        this.state = { counter: 0};
        this.LoginCheck = React.createRef<HTMLButtonElement>();
    }
    private getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift();
        }
    }
    componentDidMount() {
        this.LoginCheck.current?.addEventListener('click', this.handleLoginCheck);
    }

    private handleLoginCheck = (event: MouseEvent) => {
        alert('login check');
      
        const token = window.localStorage.getItem('token4game');
        console.log(token);
        if (token === null) {
            alert('not login');
            window.location.href = 'https://youtu.be/luJJBeCFeM0?t=100';
        }
        else {

            fetch(this.endpoint + '/logincheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token }),
            }).then(response => response.json()).then(data => {
                if (data.result === 'ok') {
                    alert('login');
                    window.location.pathname = '/canvas';
                }
                else {
                    alert('not login');
                    window.location.href = 'https://youtu.be/luJJBeCFeM0?t=100';
                }
            });
        }
    }

    render()
    {
        return (
            <div>
                <h1>hello world</h1>
                <button ref={this.LoginCheck}>login check</button>
            </div>
        );
    }
}

export default MainPage;