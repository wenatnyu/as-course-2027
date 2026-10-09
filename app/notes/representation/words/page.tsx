import Words from '../../hardware/words/study';
import {vocabulary} from './data';
import '../../hardware/study.css';
import '../../hardware/words/words.css';
import '../../hardware/words/simple.css';
export const dynamic='force-static';
export default function Page(){return <Words vocabulary={vocabulary} chapter={1} title="Information representation" range="L01–06" description="数制与单位、带符号整数、字符、图像、声音与压缩；包含用于理解解释的辅助词。"/>;}
