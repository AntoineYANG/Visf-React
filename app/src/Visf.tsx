import React, { Component } from 'react';
import ReactDOM from 'react-dom';

interface Canvas_props {
    Controller: Canvas;
    width: number;
    height: number;
    id?: string;
}

interface Canvas_state {}

class VfCanvas extends Component<Canvas_props, Canvas_state, any> {
    private ctx: CanvasRenderingContext2D | null = null;
    public readonly state: Canvas_state = {};


    // Class logic
    private init(canvas: HTMLCanvasElement): boolean {
        if (canvas) {
            this.ctx = canvas.getContext('2d')!;
            return true;
        }
        return false;
    };

    public draw(): boolean {
        if (!this.ctx) {
            console.error('Context undefined');
            return false;
        }
        this.ctx.fillStyle = "rgb(200,0,0)";
        this.ctx.fillRect(10, 10, 55, 50);
        this.ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        this.ctx.fillRect(30, 30, 55, 50);
        return true;
    }

    public _(): CanvasRenderingContext2D {
        return this.ctx!;
    }
    
    // OnMount
    public constructor(props: Readonly<Canvas_props>) {
        super(props);
        this.props.Controller.bind(this);
    }
    
    public render(): JSX.Element {
        return this.props.id !== void 0
            ? (<canvas ref={this.init.bind(this)} id={this.props.id} width={this.props.width} height={this.props.height} />)
            : (<canvas ref={this.init.bind(this)} width={this.props.width} height={this.props.height} />);
    }

    public componentDidMount(): void {
    }
}

export class Canvas {
    private $: VfCanvas | null = null;
    private attr: Canvas_props | null = null;
    private autoFillStyleSave: boolean = true;
    private fillStyleMem: Array<string | CanvasGradient | CanvasPattern> = [];

    public bind(element: VfCanvas): boolean {
        if (element) {
            this.$ = element;
            return true;
        }
        return false;
    }

    public fillRect(x: number, y: number, width: number, height: number): boolean {
        if (!this.$) {
            return false;
        }
        this.$._().fillRect(x, y, width, height);
        return true;
    }

    public fillStyle(style: string | CanvasGradient | CanvasPattern): void {
        if (!this.$) {
            return;
        }
        this.$._().fillStyle = style;
        if (this.autoFillStyleSave) {
            this.fillStyleMem.push(style);
        }
    }

    public loadFillStyle(idx: number): boolean {
        if (!this.$) {
            return false;
        }
        idx = idx < 0 ? this.fillStyleMem.length - idx : idx;
        this.$._().fillStyle = this.fillStyleMem[idx % this.fillStyleMem.length];
        return true;
    }

    public saveFillStyle(flag: boolean): void {
        this.autoFillStyleSave = flag;
    }

    public strokeRect(x: number, y: number, width: number, height: number): boolean {
        if (!this.$) {
            return false;
        }
        this.$._().strokeRect(x, y, width, height);
        return true;
    }

    public clearRect(x: number, y: number, width: number, height: number): boolean {
        if (!this.$) {
            return false;
        }
        this.$._().clearRect(x, y, width, height);
        return true;
    }

    public constructor(width: number, height: number, id?: string) {
        this.attr = {
            Controller: this,
            width: width,
            height: height,
            id: id
        };
    }

    public renderThis(container: Element | null): boolean {
        if (container) {
            ReactDOM.render(<VfCanvas
                                Controller={this}
                                id={(this.attr)!.id}
                                width={(this.attr)!.width}
                                height={(this.attr)!.height}
                            />, container);
            return true;
        }
        return false;
    }
}