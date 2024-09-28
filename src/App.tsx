import { useState } from 'react';
import './App.css'
import {  kastaenergy, apps, friend, wallet, farmx2,} from './images';

const App: React.FC = () => {
  const [isKastaEnergyVisible, setIsKastaEnergyVisible] = useState(false);
  const [isFriendVisible, setIsFriendVisible] = useState(false);
  const [isWalletVisible, setIsWalletVisible] = useState(false);
  const [isAppsVisible, setIsAppsVisible] = useState(false);
  const [balance, setBalance] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isMining, setIsMining] = useState(false);
  const [isBoosted, setIsBoosted] = useState(false);

  // Новые состояния для реферальной системы
  const [referralsCount, setReferralsCount] = useState(0); // Количество приглашенных
  const [earnedFromReferrals, setEarnedFromReferrals] = useState(0); // Заработанные токены от рефералов
  const [userID] = useState(Math.floor(Math.random() * 1000000)); // Генерируем уникальный ID пользователя

  const startMining = () => {
    setIsMining(true);
    setTimeLeft(12 * 60 * 60); // Это 12 часов в секундах

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setIsMining(false);
      setTimeLeft(0);
    }, 12 * 60 * 60 * 1000); // Через 12 часов
  };

  const getToken = () => {
    setBalance(prev => prev + (isBoosted ? 0.2 : 0.1));
    setIsMining(false);
    setTimeLeft(null);
  };

  // Функция для добавления реферала
  const addReferral = () => {
    setReferralsCount(prev => prev + 1);
    setEarnedFromReferrals(prev => prev + 0.05);
    setBalance(prev => prev + 0.05); // Добавляем 0.05 токена в общий баланс
  };

  const copyReferralLink = () => {
    const referralLink = `https://yourapp.com/referral?userId=${userID}`; // Создаем реферальную ссылку
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        alert("Реферальная ссылка скопирована в буфер обмена!");
      })
      .catch(err => {
        console.error('Ошибка при копировании: ', err);
      });
  };

  const handleClose = () => {
    setIsKastaEnergyVisible(false);
    setIsFriendVisible(false);
    setIsWalletVisible(false);
    setIsAppsVisible(false);
  };

  const handleBuyBoost = () => {
    alert("Вы купили улучшение! Теперь ваша скорость майнинга увеличена в 2 раза.");
    setIsBoosted(true);
  };

  const openKastaEnergy = () => {
    if (!isFriendVisible && !isWalletVisible && !isAppsVisible) {
      setIsKastaEnergyVisible(true);
    }
  };

  const openFriendMenu = () => {
    if (!isKastaEnergyVisible && !isWalletVisible && !isAppsVisible) {
      setIsFriendVisible(true);
    }
  };

  const openWalletMenu = () => {
    if (!isKastaEnergyVisible && !isFriendVisible && !isAppsVisible) {
      setIsWalletVisible(true);
    }
  };

  const openAppsMenu = () => {
    if (!isKastaEnergyVisible && !isFriendVisible && !isWalletVisible) {
      setIsAppsVisible(true);
    }
  };

  return (
    <div className="background bg-black flex justify-center">
      <div className="w-full text-white h-screen font-bold flex flex-col max-w-xl relative">
        <div className="app">
          {timeLeft !== null && (
            <p className="absolute top-1/3 left-1/2 transform -translate-x-1/2 p-3 text-lg px-40 mt-80 py-14">
              {isMining
                ? `${Math.floor(timeLeft / 3600)}:${(Math.floor((timeLeft % 3600) / 60)).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`
                : ''}
            </p>
          )}

          {!isMining && timeLeft === null && (
            <button 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-violet-500 rounded-lg text-white px-40 mt-80"
              onClick={startMining}
            >
              Start
            </button>
          )}
          {isMining && (
            <button 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-violet-500 rounded-lg text-white px-40 mt-80 opacity-50 cursor-not-allowed"
              disabled
            >
              Mining...
            </button>
          )}
          {timeLeft === 0 && !isMining && (
            <button 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-lime-500 rounded-lg text-white px-40 mt-80"
              onClick={getToken}
            >
              Claim
            </button>
          )}

          {isKastaEnergyVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#1f1f1f] p-10 rounded-lg w-4/5 max-w-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-yellow-400 text-3xl mb-4">✨ BOOST MENU ✨</h2>
                <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-4 right-4">✖️</span>
                <p className="text-white text-center text-lg font-medium mb-6">
                  🚀 Улучшите свою скорость майнинга!
                  <br />
                  Покупая это улучшение, вы удвоите свою скорость майнинга. Это отличная возможность увеличить ваш доход!
                </p>

                <div className="flex items-center justify-center mt-4">
                  <img 
                    src={farmx2} 
                    alt="Buy Upgrade" 
                    className="w-32 ml-2" 
                  />
                  <button 
                    className={`bg-violet-500 text-white font-bold py-2 px-4 rounded ml-4 ${isBoosted ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    onClick={handleBuyBoost} 
                    disabled={isBoosted}
                  >
                    Купить за 1 TON
                  </button>
                </div>
              </div>
            </div>
          )}

{isFriendVisible && (
  <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
    <div className="modal-content bg-[#1f1f1f] p-10 rounded-lg w-4/5 max-w-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
      <h2 className="text-center text-yellow-400 text-3xl mb-4">👫 Friends Menu</h2>
      <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-4 right-4">✖️</span>
      <p className="text-white text-lg text-center">
        Количество приглашенных друзей: <span className="font-bold">{referralsCount}</span>
      </p>
      <p className="text-white text-lg text-center">
        Общая сумма заработанных токенов KST от рефералов: <span className="font-bold">{earnedFromReferrals.toFixed(2)} KST</span>
      </p>
      <div className="flex justify-center mt-6">
        <button className="px-4 py-2 bg-violet-500 text-white rounded" onClick={() => { addReferral(); copyReferralLink(); }}>
          Пригласить друга
        </button>
      </div>
    </div>
  </div>
          )}

          {isWalletVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#1f1f1f] p-10 rounded-lg w-4/5 max-w-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-yellow-400 text-3xl mb-4">💼 Wallet Menu</h2>
                <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-4 right-4">✖️</span>
                <p className="text-white text-lg text-center">Текущий баланс токенов: <span className="font-bold">{balance} KST</span></p>
              </div>
            </div>
          )}

          {isAppsVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#1f1f1f] p-10 rounded-lg w-4/5 max-w-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-yellow-400 text-3xl mb-4">📱 Apps Menu</h2>
                <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-4 right-4">✖️</span>
                <p className="text-white text-lg text-center">Используйте приложения для улучшения вашего опыта!</p>
              </div>
            </div>
          )}

          <div className="px-44 mt-7">
            <div className="px-21 mt-180">
              <div className="px-1 py-60"></div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
          <div className="text-center m-1 p-2 rounded-2xl" onClick={openKastaEnergy}>
            <img src={kastaenergy} alt="Mine" className="w-12 h-12 mx-auto" />
          </div>

          <div className="text-center m-1 p-2 rounded-2xl" onClick={openFriendMenu}>
            <img src={friend} alt="Friends" className="w-12 h-12 mx-auto" />
          </div>

          <div className="text-center m-1 p-2 rounded-2xl" onClick={openWalletMenu}>
            <img src={wallet} alt="Earn" className="w-12 h-12 mx-auto" />
          </div>

          <div className="text-center text-[#85827d] w-2/8" onClick={openAppsMenu}>
            <img src={apps} alt="Airdrop" className="w-12 h-12 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;