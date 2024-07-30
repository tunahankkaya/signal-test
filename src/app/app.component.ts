import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>{{count()}}</h1>
    <h1>Computed: {{countPlus()}}</h1>
    <br>
    <button (click)="increment()">+</button>
    <button (click)="decrement()">-</button>
    <hr>
    <ul>
      @for (result of results(); track $index) {
        <li >{{result}}</li>
      }
      
    </ul>
  `,
})
export class AppComponent {
  count = signal(0);
  results = signal<string[]>([]);

  //computed, effect 
  countPlus = computed(() => this.count() + 1);
  countEffect = effect(() => console.log(this.count() +"değişti"));

  increment() {
    /* 
    signalde 3 adet method vardır: set, update ve mutate

    Set Yöntemi: mevcut değeri sıfırdan atayacaksak kullanırız.
    this.count.set(0); // count değerini 0 yapar
    this.count.set(this.count()+1); // count değerini 1 arttırır

    Update Yöntemi: mevcut değeri değiştirmek için kullanılır
    this.count.update((oldValue) => {
      return oldValue + 1;
    })

    Mutate Yöntemi: update ile aynı işi yapar fakat genelde listenin içindeki elemanları güncellemek için kullanılır
    this.count.mutate((oldValue) => {
      return oldValue + 1;
    })

  */

    this.count.update((c) => c + 1); 
    this.results.update((r) => [...r, `Count is now ${this.count()}`]);
  }

  decrement() {
    this.count.update((c) => c - 1); // update the count signal
    this.results.update((r) => [...r, `Count is now ${this.count()}`]);
  }
}
