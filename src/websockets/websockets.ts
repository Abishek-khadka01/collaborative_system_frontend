class WebSockets {
  private ws: WebSocket | null = null;

  public connectSocket() {
    this.ws = new WebSocket(`ws://localhost:4000?token=${localStorage.getItem('token')}`);
  }

  public sendMessage(message: any) {
    this.ws?.send(JSON.stringify(message));
  }

  public receiveMessage(callback: (data: any) => void) {
    this.ws!.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      callback(data);
    };
  }
}
