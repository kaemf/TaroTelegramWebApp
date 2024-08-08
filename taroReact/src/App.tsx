// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import './App.css'
import Taro from './components/Taro'
import UIIcon from './UI/UIIcon'
import AnimationLoad from './UI/Access/animations/AnimationLoad/AnimationLoad'
import UIButton from './UI/Buttons/UIButton'


const data = [
  {
    opening: [
      "https://gadalki.it888.ru/public/Opening.mp4"
    ],
    openingLoop: [
      "https://gadalki.it888.ru/public/Opened_Loop.mp4"
    ],
    closedLoop: "https://gadalki.it888.ru/public/Closed_Loop.mp4",
    title: "«Пирамида Любви»",
    prompt: `Расклад Пирамида Любви поможет разобраться в сложных ситуациях и найти путь к гармонии и счастью в любовных делах. Этот расклад, состоящий из четырех карт - путеводитель и советчик, раскрывающий важные аспекты отношений. Первая выпавшая карта - Король Пентаклей, Вторая карта - Тройка Кубков, Третья карта - Девятка Жезлов, Четвертая карта - Королева Пентаклей. Первая карта расскажет о вас, вашем влиянии и роли в текущих взаимоотношениях.Вторая карта даст понимание поведения, чувств и эмоций вашего избранника по отношению к вам.Третья карта покажет состояние ваших любовных отношений в данный момент, сравнивая ваши ожидания с реальностью.Четвертая карта предскажет, как будут развиваться события в будущем. на основании этой информации сделай увлекательный и интересный вывод длинной не более 6 предложений, без упоминания о выпавших картах`,
    // durationOpening: 1,
    durationOpening: 26200,
    whatIsIt: [
      {
        classes: "fontBold fontSize14",
        text: "Запутались в отношениях и ищете ответы?"
      },
      {
        text: "Пирамида Любви поможет разобраться в сложных ситуациях и найти путь к гармонии и счастью в любовных делах.",
      },
      {
        text: "Этот расклад, состоящий из четырех карт - путеводитель и советчик, раскрывающий важные аспекты отношений."
      },
    ],
    cardsName: [
      [
        {
          name: "Король Пентаклей",
        },
        {
          name: "Тройка Кубков",
        },
        {
          name: "Девятка Жезлов",
        },
        {
          name: "Королева Пентаклей",
        }
      ]
    ],
    whatIsCards: [
      {
        focus: {
          transform: `scale(2.5) translate(-16%, -17%)`,
        },
        position: {
          left: "34.5%",
          top: "37%",
          height: "22.5%",
          width: "22%",
          transform: "rotate(-2deg)"
        },
        text: "Первая карта расскажет о вас, вашем влиянии и роли в текущих взаимоотношениях."
      },
      {
        focus: {
          transform: `scale(2.5) translate(7%, -40%)`,
        },
        position: {
          left: "11.5%",
          top: "59.5%",
          height: "22%",
          width: "22%",
          transform: "rotate(0deg)"
        },
        text: "Вторая карта даст понимание поведения, чувств и эмоций вашего избранника по отношению к вам."
      },
      {
        focus: {
          transform: `scale(2.5) translate(-17%, -39%)`,
        },
        position: {
          left: "35.5%",
          top: "59.5%",
          height: "23%",
          width: "22%",
        },
        text: "Третья карта покажет состояние ваших любовных отношений в данный момент, сравнивая ваши ожидания с реальностью."
      },
      {
        focus: {
          transform: `scale(2.5) translate(-41%, -39%)`,
        },
        position: {
          left: "60.5%",
          top: "59.5%",
          height: "23%",
          width: "22%",
        },
        text: "Четвертая карта предскажет, как будут развиваться события в будущем."
      }
    ]
  },
  {
    opening: [
      "https://gadalki.it888.ru/public/chasha/Opening.mp4"
    ],
    openingLoop: [
      "https://gadalki.it888.ru/public/chasha/Opened_Loop_2.mp4"
    ],
    closedLoop: "https://gadalki.it888.ru/public/chasha/Closed_Loop.mp4",
    title: "«Полная чаша»",
    prompt: `Используя расклад, вы сможете получить ценные инсайты и конкретные рекомендации, которые помогут вам улучшить ваше материальное состояние и привлечь благополучие в вашу жизнь. Первая карта раскрывает истинное положение дел, отвечает на вопрос, почему у вас сложилось сложное положение относительно финансов. Показывает на конкретные проблемы и затруднения.Вторая карта расскажет обо всём, что может вам помочь улучшить свое материальное положение - ваши помощники, подсказки и советы. Информация, на которую стоит обратить внимание и тщательно проанализировать.ретья карта покажет что необходимо иметь в своем распоряжении, какие черты характера вам помогают и чего вам недостает для разрешения ситуации. К чему стоит стремиться, и какие качества стоит приобретать и нарабатывать.Четвертая карта укажет что вам необходимо предпринимать для стабилизации положения. Действия для привлечения удачи на свою сторону и совет, как преодолеть имеющиеся трудности.Выпавшие карты - Король Пентаклей, Тройка Кубков, Девятка Жезлов и Королева Пентаклей. На основании этой информации сделай увлекательный и интересный вывод длинной не более 6 предложений , без упоминания о картах`,
    // durationOpening: 1,
    durationOpening: 24200,
    whatIsIt: [
      {
        classes: "fontSize14 fontBold",
        text: "Используя расклад «Полная Чаша», вы сможете получить ценные инсайты и конкретные рекомендации, которые помогут вам улучшить ваше материальное состояние и привлечь благополучие в вашу жизнь. "
      },
      {
        text: "Начните расклад и откройте для себя новые возможности на пути к финансовой стабильности и процветанию.",
      }
    ],
    cardsName: [
      [
        {
          name: "Король Пентаклей"
        },
        {
          name: "Тройка Кубков"
        },
        {
          name: "Девятка Жезлов"
        },
        {
          name: "Королева Пентаклей"
        }
      ]
    ],
    whatIsCards: [
      {
        focus: {
          transform: `scale(2.5) translate(5%, -18%)`,
        },
        position: {
          left: "13.5%",
          top: "38%",
          height: "23.5%",
          width: "23%",
          transform: "rotate(-2deg)",
        },
        text: "Первая карта раскрывает истинное положение дел, отвечает на вопрос, почему у вас сложилось сложное положение относительно финансов. Показывает на конкретные проблемы и затруднения."
      },
      {
        focus: {
          transform: `scale(2.5) translate(-18%, -19%)`,
        },
        position: {
          left: "38.5%",
          top: "39.5%",
          height: "22%",
          width: "22%",
          transform: "rotate(4deg)",
        },
        text: "Вторая карта расскажет обо всём, что может вам помочь улучшить свое материальное положение - ваши помощники, подсказки и советы. Информация, на которую стоит обратить внимание и тщательно проанализировать."
      },
      {
        focus: {
          transform: `scale(2.5) translate(-19%, -42%)`,
        },
        position: {
          left: "37.5%",
          top: "61.5%",
          height: "23%",
          width: "22%",
          transform: "rotate(2deg)",
        },
        text: "Третья карта покажет что необходимо иметь в своем распоряжении, какие черты характера вам помогают и чего вам недостает для разрешения ситуации. К чему стоит стремиться, и какие качества стоит приобретать и нарабатывать."
      },
      {
        focus: {
          transform: `scale(2.5) translate(-45%, -19%)`,
        },
        position: {
          left: "63.5%",
          top: "39.5%",
          height: "23%",
          width: "22%",
          transform: "rotate(2deg)"
        },
        text: "Четвертая карта укажет что вам необходимо предпринимать для стабилизации положения. Действия для привлечения удачи на свою сторону и совет, как преодолеть имеющиеся трудности."
      }
    ]
  },
  {
    opening: [
      "https://gadalki.it888.ru/public/trikarti/Opening2.mp4",
      "../../rasklad/love/opening1.mov",
      "../../rasklad/love/opening2.mov",
      "../../rasklad/love/opening3.mov",
      "../../rasklad/love/opening4.mov",
      "../../rasklad/love/opening5.mov",
      "../../rasklad/love/opening6.mov",
      "../../rasklad/love/opening7.mov"
    ],
    openingLoop: [
      "https://gadalki.it888.ru/public/trikarti/Opened_Loop.mp4",
      "../../rasklad/love/opened1.mov",
      "../../rasklad/love/opened2.mov",
      "../../rasklad/love/opened3.mov",
      "../../rasklad/love/opened4.mov",
      "../../rasklad/love/opened5.mov",
      "../../rasklad/love/opened6.mov",
      "../../rasklad/love/opened7.mov"
    ],
    closedLoop: "https://gadalki.it888.ru/public/trikarti/Closed_Loop.mp4",
    title: "«Три карты»",
    prompt: `Готовы узнать, что скрывается за картами вашей судьбы? Вас ждет увлекательное путешествие по вашему прошлому, настоящему и будущему, раскрывая тайны и предсказывая возможности. Откройте для себя, какие события и влияния сформировали вашу текущую ситуацию, какие уроки они несут и как использовать их для своей пользы. Первая карта раскрывает корни текущих вызовов и проблем, помогая идентифицировать источники затруднений во всех сферах жизни.Вторая карта обращает внимание на текущие факторы и условия, которые оказывают влияние на вашу жизненную ситуацию. Она подсвечивает ключевые аспекты, которые могут быть использованы для улучшения положения в любых аспектах жизни — от отношений до карьеры.Третья карта предсказывает возможное будущее и указывает на качества, ресурсы и действия, которые могут быть важными для достижения желаемых результатов. Выпавшие карты - Девятка Жезлов, Королева Пентаклей, Тройка Кубков.На основании этой информации сделай увлекательный и интересный вывод длинной не более 6 предложений , без упоминания о картах`,
    // durationOpening: 1,
    durationOpening: 24200,
    whatIsIt: [
      {
        classes: "fontSize14 fontBold",
        text: "Добро пожаловать на расклад Три Карты! "
      },
      {
        text: "Готовы узнать, что скрывается за картами вашей судьбы? Вас ждет увлекательное путешествие по вашему прошлому, настоящему и будущему, раскрывая тайны и предсказывая возможности. Откройте для себя, какие события и влияния сформировали вашу текущую ситуацию, какие уроки они несут и как использовать их для своей пользы. ",
      },
      {
        text: "Подготовьтесь к открытиям и откровениям!",
      }
    ],
    cardsName: [
      [
        {
          name: "Девятка Жезлов"
        },
        {
          name: "Королева Пентаклей"
        },
        {
          name: "Тройка Кубков"
        }
      ],
      [
        {
          name: "Семёрка Жезлов"
        },
        {
          name: "Король Пентаклей"
        },
        {
          name: "Семёрка Пентаклей"
        }
      ],
      [
        {
          name: "Пятерка Кубков"
        },
        {
          name: "Королева Жезлов"
        },
        {
          name: "Десятка Пентаклей"
        }
      ],
      [
        {
          name: "Тройка Жезлов"
        },
        {
          name: "Десятка Жезлов"
        },
        {
          name: "Король Жезлов"
        }
      ],
      [
        {
          name: "Влюбленные"
        },
        {
          name: "Королева Кубков"
        },
        {
          name: "Повешенный"
        }
      ],
      [
        {
          name: "Мир"
        },
        {
          name: "Туз Пентаклей"
        },
        {
          name: "Шестерка Мечей"
        }
      ],
      [
        {
          name: "Колесо Фортуны"
        },
        {
          name: "Луна"
        },
        {
          name: "Восьмерка Мечей"
        }
      ],
      [
        {
          name: "Отшельник"
        },
        {
          name: "Десятка Мечей"
        },
        {
          name: "Восьмерка Жезлов"
        }
      ]
    ],
    whatIsCards: [
      {
        focus: {
          transform: `scale(2.5) translate(8%, -23%)`,
        },
        position: {
          left: "9.5%",
          top: "42%",
          height: "23.5%",
          width: "23%",
          transform: "rotate(1deg)"
        },
        text: "Первая карта раскрывает корни текущих вызовов и проблем, помогая идентифицировать источники затруднений во всех сферах жизни."
      },
      {
        focus: {
          transform: `scale(2.5) translate(-19%, -23%)`,
        },
        position: {
          left: "37.5%",
          top: "42.5%",
          height: "24%",
          width: "24%",
          transform: "rotate(358deg)",
        },
        text: "Вторая карта обращает внимание на текущие факторы и условия, которые оказывают влияние на вашу жизненную ситуацию. Она подсвечивает ключевые аспекты, которые могут быть использованы для улучшения положения в любых аспектах жизни — от отношений до карьеры."
      },
      {
        focus: {
          transform: `scale(2.5) translate(-46%, -23%)`,
        },
        position: {
          left: "63.5%",
          top: "41.5%",
          height: "25%",
          width: "25%",
          transform: "rotate(358deg)",
        },
        text: "Третья карта предсказывает возможное будущее и указывает на качества, ресурсы и действия, которые могут быть важными для достижения желаемых результатов."
      }
    ]
  }
]

const VideoLoader = ({ src, onLoaded }) => {
  return <video 
  onError={() => alert("ОШИБКА", src)} onLoadedData={onLoaded} src={src} style={{ display: 'none' }} />;
};

const VideoPreload = ({ handleVideoLoaded, data }) => {
  return (
    <>
      <VideoLoader src={data.opening} onLoaded={() => handleVideoLoaded('video1')} />
      <VideoLoader src={data.openingLoop} onLoaded={() => handleVideoLoaded('video2')} />
      <VideoLoader src={data.closedLoop} onLoaded={() => handleVideoLoaded('video3')} />
    </>
  );
};

function App() {

  const [ activeRasklad, setActiveRasklad ] = useState(-1)
  const [widthPx, setWidthPx] = useState(window.innerWidth);
  const [heightPx, setHeightPx] = useState(window.innerHeight);
  const [videoLoadStatus, setVideoLoadStatus] = useState({ video1: false, video2: false, video3: false });

  const active = getQueryParams().active;

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const cf = screenHeight / screenWidth;

      if (cf < 1.77777) {
        setHeightPx(screenWidth * 1.77777);
        setWidthPx(screenWidth);
      } else {
        setHeightPx(screenHeight);
        setWidthPx(screenHeight / 1.77777);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleVideoLoaded = (videoKey) => {
    setVideoLoadStatus(prevStatus => ({
      ...prevStatus,
      [videoKey]: true
    }));
  };

  const timer = useRef()

  const startTimer = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout( () => {
      setVideoLoadStatus({ video1: true, video2: true, video3: true })
    }, 25000 )
  }

  useEffect( () => {
    if( activeRasklad < 0 ) return
    else startTimer()
  }, [ activeRasklad ] )

  const allVideoLoad = Object.values(videoLoadStatus).every(v => v);

  if (!allVideoLoad && activeRasklad > -1 ) return (
    <div className="OuterPage">
      <VideoPreload data={data[activeRasklad]} handleVideoLoaded={handleVideoLoaded} />
      <div className={`outerLoading`}>
        <UIIcon size="30">
          <AnimationLoad color='swiper-theme-color' />
        </UIIcon>
      </div>
    </div>
  );

  return (
    <>
      {/* { activeRasklad === -1 && <div>
        <UIButton handleClick={() => setActiveRasklad(0)}>
          Про любовь
        </UIButton>
        <UIButton handleClick={() => setActiveRasklad(1)}>
          Полная чаша
        </UIButton>
        <UIButton handleClick={() => setActiveRasklad(2)}>
          Три карты
        </UIButton>
      </div>} */}
      {active === 'love' && <Taro dataP={data[0]} widthPx={widthPx} heightPx={heightPx} />}
      {active === 'full' && <Taro dataP={data[1]} widthPx={widthPx} heightPx={heightPx} />}
      {active === 'cards' && <Taro dataP={data[2]} widthPx={widthPx} heightPx={heightPx} />}
    </>
  );
}

export default App;
