export const keyMap = [
  // 1st row
  {
    key: 'Escape',
    image: '39'
  },
  {
    key: 'F1',
    image: '38'
  },
  {
    key: 'F2',
    image: '38'
  },
  {
    key: 'F3',
    image: '38'
  },
  {
    key: 'F4',
    image: '38'
  },
  {
    key: 'F5',
    image: '38'
  },
  {
    key: 'F6',
    image: '38'
  },
  {
    key: 'F7',
    image: '38'
  },
  {
    key: 'F8',
    image: '38'
  },
  {
    key: 'F9',
    image: '38'
  },
  {
    key: 'F10',
    image: '38'
  },
  {
    key: 'F11',
    image: '38'
  },
  {
    key: 'F12',
    image: '38'
  },

  // 2nd row
  {
    key: 'Grave',
    image: '10'
  },
  {
    key: 'Key1',
    image: '9'
  },
  {
    key: 'Key2',
    image: '8'
  },
  {
    key: 'Key3',
    image: '7'
  },
  {
    key: 'Key4',
    image: '6'
  },
  {
    key: 'Key5',
    image: '5'
  },
  {
    key: 'Key6',
    image: '4'
  },
  {
    key: 'Key7',
    image: '3'
  },
  {
    key: 'Key8',
    image: '2'
  },
  {
    key: 'Key9',
    image: '1'
  },
  {
    key: 'Key0',
    image: '0'
  },
  {
    key: 'Minus',
    image: '-'
  },
  {
    key: 'Equal',
    image: '='
  },
  {
    key: 'Backspace',
    image: '41'
  },

  // 3rd row
  {
    key: 'Tab',
    image: '48'
  },
  {
    key: 'Q',
    image: '20'
  },
  {
    key: 'W',
    image: '19'
  },
  {
    key: 'E',
    image: '18'
  },
  {
    key: 'R',
    image: '17'
  },
  {
    key: 'T',
    image: '16'
  },
  {
    key: 'Y',
    image: '15'
  },
  {
    key: 'U',
    image: '14'
  },
  {
    key: 'I',
    image: '13'
  },
  {
    key: 'O',
    image: '12'
  },
  {
    key: 'P',
    image: '11'
  },
  {
    key: 'LeftBracket'
  },
  {
    key: 'RightBracket'
  },
  {
    key: 'BackSlash'
  },

  // 4th row
  {
    key: 'CapsLock',
    image: '47'
  },
  {
    key: 'A',
    image: '33'
  },
  {
    key: 'S',
    image: '34'
  },
  {
    key: 'D',
    image: '35'
  },
  {
    key: 'F',
    image: '32'
  },
  {
    key: 'G',
    image: '31'
  },
  {
    key: 'H',
    image: '30'
  },
  {
    key: 'J',
    image: '29'
  },
  {
    key: 'K',
    image: '28'
  },
  {
    key: 'L',
    image: '27'
  },
  {
    key: 'Semicolon'
  },
  {
    key: 'Apostrophe'
  },
  {
    key: 'Enter',
    image: '42'
  },

  // 5th row
  {
    key: 'Shift',
    image: '45'
  },
  {
    key: 'Z',
    image: '37'
  },
  {
    key: 'X',
    image: '36'
  },
  {
    key: 'C',
    image: '26'
  },
  {
    key: 'V',
    image: '25'
  },
  {
    key: 'B',
    image: '24'
  },
  {
    key: 'N',
    image: '23'
  },
  {
    key: 'M',
    image: '22'
  },
  {
    key: 'Comma'
  },
  {
    key: 'Dot'
  },
  {
    key: 'Slash'
  },

  // 6th row
  {
    key: 'Control',
    image: '46'
  },
  {
    key: 'Alt',
    image: '44'
  },
  {
    key: 'Meta',
    image: '49'
  },
  {
    key: 'Space',
    image: '43'
  },

  // function row
  {
    key: '126'
  },
  {
    key: '123'
  },
  {
    key: '125'
  },
  {
    key: '124'
  },
  {
    key: 'Delete',
    image: '40'
  }
];

export const getKeyPressImage = (key: string) => {
  const blurKey = key.slice(1);

  switch (blurKey) {
    case 'Shift':
    case 'Control':
    case 'Alt':
      key = blurKey;
      break;
  }

  const findImage = keyMap.find((item) => item.key === key);

  if (!findImage) return -1;

  return Number(findImage.image);
};
