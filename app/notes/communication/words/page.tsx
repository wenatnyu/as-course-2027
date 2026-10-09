import Words from '../../hardware/words/study';
import {vocabulary} from './data';
import '../../hardware/study.css';
import '../../hardware/words/words.css';
import '../../hardware/words/simple.css';
export const dynamic='force-static';
export default function Page(){return <Words vocabulary={vocabulary} chapter={2} title="Communication" range="L07–10" description="网络模式、拓扑、云计算、传输介质、网络设备、互联网、IP 与 DNS；HTTPS、DHCP、NAT 及 DNS 层级等词用于辅助理解相关说明。"/>;}
