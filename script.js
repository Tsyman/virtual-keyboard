/* eslint-disable eqeqeq */

const Keyboard = {
  elements: {
    textarea: null,
    main: null,
    keysContainer: null,
    keys: [],
  },

  properties: {
    value: '',
    language: null,
  },

  keyLayout: {
    keyArrRu: [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'DEL',
      'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
      'Shift', 'Ру', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'shift',
      'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►',
    ],

    keyArrRuShift: [
      'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
      'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'DEL',
      'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
      'Shift', 'Ру', 'Я', 'Ч', 'С', 'М', 'И', 'Е', 'Ь', 'Б', 'Ю', ',', '▲', 'shift',
      'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►',
    ],

    keyArrEn: [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'DEL',
      'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
      'Shift', 'En', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'shift',
      'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►',
    ],
    keyArrEnShift: [
      '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
      'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'DEL',
      'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
      'Shift', 'En', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲', 'shift',
      'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►',
    ],
    keyCode: [
      'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
      'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
      'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
      'ShiftLeft', 'En', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
      'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
    ],
  },

  init() {
    this.elements.textarea = document.createElement('textarea');
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.textarea.classList.add('textarea');
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');

    this.properties.language = this.keyLayout.keyArrEn;
    if (sessionStorage.getItem('language') == this.keyLayout.keyArrRu) {
      this.properties.language = this.keyLayout.keyArrRu;
      sessionStorage.setItem('language', this.properties.language);
    } else if (sessionStorage.getItem('language') == this.keyLayout.keyArrRuShift) {
      this.properties.language = this.keyLayout.keyArrRuShift;
      sessionStorage.setItem('language', this.properties.language);
    } else if (sessionStorage.getItem('language') == this.keyLayout.keyArrEnShift) {
      this.properties.language = this.keyLayout.keyArrEnShift;
      sessionStorage.setItem('language', this.properties.language);
    }

    this.elements.keysContainer.appendChild(this.createKeys(this.properties.language));
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
    document.body.prepend(this.elements.textarea);

    document.addEventListener('mousedown', (event) => {
      this.elements.keys.forEach((elem) => {
        if (event.target == elem && elem.textContent.length == 1 && !(elem.id == 'ArrowUp' || elem.id == 'ArrowLeft' || elem.id == 'ArrowDown' || elem.id == 'ArrowRight')) {
          this.properties.value += elem.textContent;
          this.inTextArea(this.properties.value);
        } else if (event.target == elem && elem.id == 'Backspace') {
          const valueLength = this.properties.value.length;
          this.properties.value = this.properties.value.substring(0, valueLength - 1);
          this.inTextArea(this.properties.value);
        } else if (event.target == elem && elem.id == 'CapsLock') {
          this.toggleCapsLock();
        } else if (event.target == elem && (elem.id == 'ShiftLeft' || elem.id == 'ShiftRight')) {
          this.toggleCapsLock();
        } else if (event.target == elem && elem.id == 'Tab') {
          this.properties.value += '    ';
          this.inTextArea(this.properties.value);
        } else if (event.target == elem && elem.id == 'Enter') {
          this.properties.value += '\n';
          this.inTextArea(this.properties.value);
        } else if (event.target == elem && elem.id == 'Space') {
          this.properties.value += ' ';
          this.inTextArea(this.properties.value);
        } else if (event.target.textContent == 'En') {
          this.changeLanguage();
        } else if (event.target.textContent == 'Ру') {
          this.changeLanguage();
        }
      });
    });

    document.addEventListener('mouseup', (event) => {
      this.elements.keys.forEach((elem) => {
        if (event.target == elem && (elem.id == 'ShiftLeft' || elem.id == 'ShiftRight')) {
          this.toggleCapsLock();
        }
      });
    });

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      const key = document.querySelector(`.keyboard__key[id = "${event.code}"]`);
      const keyId = key.id;
      if (event.code == keyId) {
        key.classList.add('active');
      }

      if (event.code == 'Backspace') {
        const valueLength = this.properties.value.length;
        this.properties.value = this.properties.value.substring(0, valueLength - 1);
        this.inTextArea(this.properties.value);
      } else if (event.code == 'CapsLock') {
        if (event.repeat) {
          return;
        }
        this.toggleCapsLock();
      } else if (event.code == 'Tab') {
        this.properties.value += '    ';
        this.inTextArea(this.properties.value);
      } else if (event.code == 'Enter') {
        this.properties.value += '\n';
        this.inTextArea(this.properties.value);
      } else if (event.code == 'Space') {
        this.properties.value += ' ';
        this.inTextArea(this.properties.value);
      } else if (event.key.length == 1) {
        this.properties.value += key.textContent;
        this.inTextArea(this.properties.value);
      } else if (event.shiftKey && event.altKey) {
        if (!event.repeat) {
          this.changeLanguage();
        }
      } else if (event.key == 'Meta') {
        return;
      }
      if (this.properties.language == this.keyLayout.keyArrEn) {
        if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
          if (!event.repeat) {
            this.toggleCapsLock();
          }
        }
      } else if (this.properties.language == this.keyLayout.keyArrRu) {
        if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
          if (!event.repeat) {
            this.toggleCapsLock();
          }
        }
      } else if (this.properties.language == this.keyLayout.keyArrRuShift) {
        if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
          if (!event.repeat) {
            this.toggleCapsLock();
          }
        }
      } else if (this.properties.language == this.keyLayout.keyArrEnShift) {
        if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
          if (!event.repeat) {
            this.toggleCapsLock();
          }
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      const key = document.querySelector(`.keyboard__key[id = "${event.code}"]`);
      const keyId = key.id;
      if (event.code == keyId) {
        key.classList.remove('active');
      }

      if (this.properties.language == this.keyLayout.keyArrEnShift) {
        if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
          this.toggleCapsLock();
        }
      } else if (this.properties.language == this.keyLayout.keyArrRuShift) {
        if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
          this.toggleCapsLock();
        }
      } else if (this.properties.language == this.keyLayout.keyArrRu) {
        if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
          this.toggleCapsLock();
        }
      } else if (this.properties.language == this.keyLayout.keyArrEn) {
        if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
          this.toggleCapsLock();
        }
      }
    });
  },


  createKeys(language) {
    const fragment = document.createDocumentFragment();
    language.forEach((key, i) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'DEL', 'Enter', 'shift'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      keyElement.textContent = key;
      keyElement.id = this.keyLayout.keyCode[i];

      switch (key) {
        case 'Backspace':
        case 'Caps Lock':
        case 'Shift':
          keyElement.classList.add('keyboard__key-wide');
          break;
        case 'Tab':
        case 'DEL':
          keyElement.classList.add('keyboard__key-tab');
          break;
        case 'Enter':
          keyElement.classList.add('keyboard__key-enter');
          break;
        case ' ':
          keyElement.classList.add('keyboard__key-space');
          break;
        case 'Ctrl':
          keyElement.classList.add('keyboard__key-ctrl');
          break;
        case 'shift':
        case 'Win':
        case 'Alt':
        case '▲':
        case '◄':
        case '▼':
        case '►':
          keyElement.classList.add('keyboard__key-colored');
          break;
        default:
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  },

  toggleCapsLock() {
    if (this.properties.language === this.keyLayout.keyArrRu) {
      this.elements.keys.forEach((elem, i) => {
        const element = elem;
        element.textContent = this.keyLayout.keyArrRuShift[i];
      });
      this.properties.language = this.keyLayout.keyArrRuShift;
      sessionStorage.setItem('language', this.properties.language);
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    } else if (this.properties.language === this.keyLayout.keyArrRuShift) {
      this.elements.keys.forEach((elem, i) => {
        const element = elem;
        element.textContent = this.keyLayout.keyArrRu[i];
      });
      this.properties.language = this.keyLayout.keyArrRu;
      sessionStorage.setItem('language', this.properties.language);
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    } else if (this.properties.language === this.keyLayout.keyArrEn) {
      this.elements.keys.forEach((elem, i) => {
        const element = elem;
        element.textContent = this.keyLayout.keyArrEnShift[i];
      });
      this.properties.language = this.keyLayout.keyArrEnShift;
      sessionStorage.setItem('language', this.properties.language);
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    } else if (this.properties.language === this.keyLayout.keyArrEnShift) {
      this.elements.keys.forEach((elem, i) => {
        const element = elem;
        element.textContent = this.keyLayout.keyArrEn[i];
      });
      this.properties.language = this.keyLayout.keyArrEn;
      sessionStorage.setItem('language', this.properties.language);
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    }
  },

  changeLanguage() {
    if (this.properties.language === this.keyLayout.keyArrRu) {
      this.elements.keys.forEach((elem, i) => {
        const element = elem;
        element.textContent = this.keyLayout.keyArrEn[i];
      });
      this.properties.language = this.keyLayout.keyArrEn;
      sessionStorage.setItem('language', this.properties.language);
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    } else if (this.properties.language === this.keyLayout.keyArrRuShift) {
      this.elements.keys.forEach((elem, i) => {
        const element = elem;
        element.textContent = this.keyLayout.keyArrEnShift[i];
      });
      this.properties.language = this.keyLayout.keyArrEnShift;
      sessionStorage.setItem('language', this.properties.language);
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    } else if (this.properties.language === this.keyLayout.keyArrEn) {
      this.elements.keys.forEach((elem, i) => {
        const element = elem;
        element.textContent = this.keyLayout.keyArrRu[i];
      });
      this.properties.language = this.keyLayout.keyArrRu;
      sessionStorage.setItem('language', this.properties.language);
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    } else if (this.properties.language === this.keyLayout.keyArrEnShift) {
      this.elements.keys.forEach((elem, i) => {
        const element = elem;
        element.textContent = this.keyLayout.keyArrRuShift[i];
      });
      this.properties.language = this.keyLayout.keyArrRuShift;
      sessionStorage.setItem('language', this.properties.language);
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    }
  },

  inTextArea(initialValue) {
    this.properties.value = initialValue || '';
    document.querySelector('textarea').value = this.properties.value;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
