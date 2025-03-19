import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

interface FloodRule {
  waterLevel: string;      // Рівень води
  waterLevelImg: string;   // Іконка рівня води

  temperature: string;     // Температура
  temperatureImg: string;  // Іконка температури

  snow: string;            // Сніг
  snowImg: string;         // Іконка снігу

  rain: string;            // Дощ
  rainImg: string;         // Іконка дощу

  conclusion: string;      // Висновок
  conclusionImg: string;   // Іконка стану повені
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // 9 правил
  floodRules: FloodRule[] = [
    // №1
    {
      waterLevel: 'Високий',
      waterLevelImg: 'assets/img/water-high.png',

      temperature: '—',
      temperatureImg: 'assets/img/temperature-none.png',

      snow: '—',
      snowImg: 'assets/img/snow-none.png',

      rain: 'Сильний',
      rainImg: 'assets/img/rain-strong.png',

      conclusion: 'Евакуювати',
      conclusionImg: 'assets/img/conclusion-evacuate.png'
    },
    // №2
    {
      waterLevel: 'Високий',
      waterLevelImg: 'assets/img/water-high.png',

      temperature: 'Висока',
      temperatureImg: 'assets/img/temperature-high.png',

      snow: 'Багато',
      snowImg: 'assets/img/snow-lot.png',

      rain: 'Помірний',
      rainImg: 'assets/img/rain-medium.png',

      conclusion: 'Евакуювати',
      conclusionImg: 'assets/img/conclusion-evacuate.png'
    },
    // №3
    {
      waterLevel: 'Високий',
      waterLevelImg: 'assets/img/water-high.png',

      temperature: 'Середня',
      temperatureImg: 'assets/img/temperature-medium.png',

      snow: 'Багато',
      snowImg: 'assets/img/snow-lot.png',

      rain: 'Помірний',
      rainImg: 'assets/img/rain-medium.png',

      conclusion: 'Посилити увагу',
      conclusionImg: 'assets/img/conclusion-alert.png'
    },
    // №4
    {
      waterLevel: 'Високий',
      waterLevelImg: 'assets/img/water-high.png',

      temperature: 'Середня',
      temperatureImg: 'assets/img/temperature-medium.png',

      snow: 'Багато',
      snowImg: 'assets/img/snow-lot.png',

      rain: 'Немає',
      rainImg: 'assets/img/rain-none.png',

      conclusion: 'Не турбуватися',
      conclusionImg: 'assets/img/conclusion-ok.png'
    },
    // №5
    {
      waterLevel: 'Високий',
      waterLevelImg: 'assets/img/water-high.png',

      temperature: 'Висока',
      temperatureImg: 'assets/img/temperature-high.png',

      snow: 'Мало',
      snowImg: 'assets/img/snow-little.png',

      rain: 'Немає',
      rainImg: 'assets/img/rain-none.png',

      conclusion: 'Не турбуватися',
      conclusionImg: 'assets/img/conclusion-ok.png'
    },
    // №6
    {
      waterLevel: 'Помірний',
      waterLevelImg: 'assets/img/water-medium.png',

      temperature: 'Висока',
      temperatureImg: 'assets/img/temperature-high.png',

      snow: 'Багато',
      snowImg: 'assets/img/snow-lot.png',

      rain: 'Сильний',
      rainImg: 'assets/img/rain-strong.png',

      conclusion: 'Посилити увагу',
      conclusionImg: 'assets/img/conclusion-alert.png'
    },
    // №7
    {
      waterLevel: 'Помірний',
      waterLevelImg: 'assets/img/water-medium.png',

      temperature: 'Середня',
      temperatureImg: 'assets/img/temperature-medium.png',

      snow: 'Багато',
      snowImg: 'assets/img/snow-lot.png',

      rain: 'Сильний',
      rainImg: 'assets/img/rain-strong.png',

      conclusion: 'Не турбуватися',
      conclusionImg: 'assets/img/conclusion-ok.png'
    },
    // №8
    {
      waterLevel: 'Помірний',
      waterLevelImg: 'assets/img/water-medium.png',

      temperature: '—',
      temperatureImg: 'assets/img/temperature-none.png',

      snow: 'Мало',
      snowImg: 'assets/img/snow-little.png',

      rain: 'Сильний',
      rainImg: 'assets/img/rain-strong.png',

      conclusion: 'Не турбуватися',
      conclusionImg: 'assets/img/conclusion-ok.png'
    },
    // №9
    {
      waterLevel: 'Високий',
      waterLevelImg: 'assets/img/water-high.png',

      temperature: '—',
      temperatureImg: 'assets/img/temperature-none.png',

      snow: '—',
      snowImg: 'assets/img/snow-none.png',

      rain: 'Помірний',
      rainImg: 'assets/img/rain-medium.png',

      conclusion: 'Не турбуватися',
      conclusionImg: 'assets/img/conclusion-ok.png'
    },
  ];

  // Поточне правило
  currentIndex = 0;
  currentRule: FloodRule = this.floodRules[0];

  // Таймер (9 секунд)
  timerValue = 9;
  private timerSubscription!: Subscription;
  private oneSecondInterval = interval(1000);
  private isRunning = false; // чи триває симуляція

  ngOnInit(): void {
    // Якщо хочете, можна автоматично стартувати, інакше чекаємо натиску кнопки:
    // this.startSimulation();
  }

  // Запуск (Старт)
  startSimulation(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.timerValue = 9;

    // Запускаємо щосекундний інтервал
    this.timerSubscription = this.oneSecondInterval.subscribe(() => {
      this.timerValue--;
      if (this.timerValue <= 0) {
        this.goNextRule();
      }
    });
  }

  // Пауза
  pauseSimulation(): void {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  // Перезапуск (скидання)
  resetSimulation(): void {
    this.pauseSimulation();
    this.currentIndex = 0;
    this.currentRule = this.floodRules[0];
    this.timerValue = 9;
  }

  // Переходимо до наступного правила
  private goNextRule(): void {
    this.currentIndex++;
    if (this.currentIndex >= this.floodRules.length) {
      this.currentIndex = 0;
    }
    this.currentRule = this.floodRules[this.currentIndex];
    this.timerValue = 9;
  }
}
