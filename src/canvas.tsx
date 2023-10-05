import { time } from "console";
import React, { Component, useRef } from"react";
import { start } from "repl";

type Player = {

    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    name: string;

};


class Canvas extends Component {
  

    private canvasREF: React.RefObject<HTMLCanvasElement>;
    private animationFrameId: number;
    private time: number;
    private fps: number;
    private interval: number;
    private lastFrameTime: number;
    private p1: Player;
    private p2: Player;
    private width: number = 800;
    private height: number = 800;
    constructor(props: any) {        
        super(props);
        this.state = { counter: 0};
        this.canvasREF = React.createRef<HTMLCanvasElement>();
        this.fps = 60; 
        this.interval = 1000 / this.fps; 
        this.lastFrameTime = 0;
        this.p2 = {x: (this.height / 2) - 150 , y: 10, width: 300, height: 20, color: 'red', name: 'p1'};
        this.p1 = {x:  (this.height / 2) - 150, y: this.height - 10 - 10  - 10 , width: 300, height: 20, color: 'blue', name: 'p2'};
   
    }
    componentDidMount() {
        this.startAnimationLoop();
        this.canvasREF.current?.addEventListener('mousemove', this.handleMouseMove);
    }
  
    handleMouseMove = (event: MouseEvent) => {
        
        let x = event.offsetX;
        let y = event.offsetY;

        if (x > (this.p1.width / 2) && x < this.width - (this.p1.width / 2))    
        {
            this.p1.x = x - (this.p1.width / 2);
        }

    }
    
    startAnimationLoop() {
        this.animationFrameId  = requestAnimationFrame(this.animate);
    }
    animate = () =>{
        const timestamp = performance.now();
        if (timestamp - this.lastFrameTime >= this.interval) {
            this.draw(); 
            this.lastFrameTime = timestamp;
          }
        this.time  = requestAnimationFrame(this.animate);
    }


    private drawBackground(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#606060';
        ctx.fillRect(0, 0, this.width, this.height);
    }

    private drawPlayer(ctx: CanvasRenderingContext2D, player: Player) {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    private updatePlayers(ctx: CanvasRenderingContext2D) {
        
        //this.p1.x += 100 * (this.interval / 1000);
        this.drawPlayer(ctx, this.p1);
        this.drawPlayer(ctx, this.p2);
    }
    draw() {
        const ctx = this.canvasREF.current?.getContext('2d');
        if (ctx) {
            
            this.drawBackground(ctx);
            this.updatePlayers(ctx);
        }
    
    }
    

    render() {
    return (
            <canvas ref={this.canvasREF} width={this.width} height={this.height} />
    );
  }
}

export default Canvas;