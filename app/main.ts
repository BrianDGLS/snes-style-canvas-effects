import {getCanvas} from './utils';
import {Snow, Fire, Rain} from './effects/index';

new Snow(getCanvas('snow'));
new Fire(getCanvas('fire'));
new Rain(getCanvas('rain'));
