// Chapter 3 vocabulary supports L11–16; not every term is a separately mandated syllabus definition.
export const groups = [
 {name:'Hardware basics · 硬件基础',lesson:'11',words:[
 ['hardware','硬件；计算机系统中的物理部件'],['software','软件；程序及相关指令'],['component','部件；组成部分'],['input device','输入设备'],['output device','输出设备'],['peripheral','外围设备'],['processor','处理器'],['primary memory','主存储器；处理器可直接访问的存储器'],['secondary storage','辅助存储；用于长期保存程序和数据'],['removable storage','可移动存储；可以从系统中移除的存储介质或设备'],['storage medium','存储介质；实际承载数据的材料或载体'],['storage device','存储设备；用于读写存储介质的硬件'],['embedded system','嵌入式系统；作为较大设备的一部分执行特定任务的计算机系统'],['dedicated function','专用功能；特定用途'],['general-purpose','通用的；可执行多种不同任务的'],['real-time','实时的；在规定时限内作出响应的'],['buffer','缓冲区；临时保存正在传输的数据'],['temporary','临时的'],['transfer rate','传输速率'],['speed mismatch','速度不匹配；设备处理或传输速率存在差异'],['overflow','溢出；超出可用容量'],['process','处理'],['instruction','指令'],['data','数据']
 ]},
 {name:'Memory · 内存', lesson:'12', words:[
 ['RAM','random access memory · 随机存取存储器'],['ROM','read-only memory · 只读存储器'],['volatile','易失性的；断电后内容丢失'],['non-volatile','非易失性的；断电后保留内容'],['read','读取'],['write','写入'],['retain','保留；保存'],['contents','存储的内容'],['power supply','电源；供电'],['firmware','固件'],['SRAM','static random access memory · 静态随机存取存储器'],['DRAM','dynamic random access memory · 动态随机存取存储器'],['bistable circuit','双稳态电路'],['capacitor','电容器'],['charge','电荷；充电'],['leakage','泄漏；此处指电荷逐渐流失'],['refresh','刷新；恢复 DRAM 存储单元的电荷'],['cache','高速缓存'],['access time','访问时间'],['capacity','容量'],['density','密度；此处指单位面积可存储的信息量'],['PROM','programmable read-only memory · 可编程只读存储器'],['EPROM','erasable programmable read-only memory · 可擦除可编程只读存储器'],['EEPROM','electrically erasable programmable read-only memory · 电可擦除可编程只读存储器'],['erase','擦除'],['reprogram','重新编程；重新写入内容'],['ultraviolet light','紫外线']
 ]},
 {name:'Magnetic disk · 磁盘',lesson:'13',words:[
 ['HDD','hard disk drive · 硬盘驱动器'],['magnetic disk','磁盘'],['platter','盘片'],['spindle','主轴；带动盘片旋转的轴'],['track','磁道；盘片表面的同心圆路径'],['sector','扇区；磁道划分出的存储区域'],['read/write head','读写磁头'],['actuator arm','执行臂；移动读写磁头的机械臂'],['magnetic coating','磁性涂层'],['magnetic field','磁场'],['magnetisation','磁化；磁化状态'],['magnetic domain','磁畴'],['rotate','旋转'],['rotation','旋转'],['seek time','寻道时间；磁头移动到所需磁道的时间'],['rotational latency','旋转延迟；等待目标扇区转到磁头下方的时间'],['mechanical','机械的'],['shock','冲击；震动']
 ]},
 {name:'SSD & flash · 固态存储',lesson:'13',words:[
 ['SSD','solid-state drive · 固态硬盘'],['flash memory','闪存'],['memory cell','存储单元'],['transistor','晶体管'],['floating gate','浮栅；被绝缘层包围、可保留电荷的栅极'],['control gate','控制栅；施加控制电压的栅极'],['electron','电子'],['trapped charge','被保留在绝缘结构内的电荷'],['insulator','绝缘体'],['insulated','被绝缘的'],['voltage','电压'],['current','电流'],['conduct','导电'],['threshold voltage','阈值电压；使晶体管开始明显导通所需的栅极电压'],['source','源极；此处为晶体管端子'],['drain','漏极；此处为晶体管端子'],['channel','沟道；晶体管中电流流经的通路'],['controller','控制器'],['moving parts','活动的机械部件']
 ]},
 {name:'Optical storage · 光学存储',lesson:'13',words:[
 ['optical disc','光盘'],['laser','激光；激光器'],['pit','凹坑'],['land','平面区域；相邻凹坑之间的区域'],['reflection','反射'],['reflectivity','反射率'],['detector','检测器'],['phase change','相变；材料在不同结构状态之间转变'],['rewritable','可重写的'],['decode','解码']
 ]},
 {name:'Printers · 打印机',lesson:'13',words:[
 ['laser printer','激光打印机'],['photosensitive drum','感光鼓'],['electrostatic image','静电图像'],['toner','墨粉；碳粉'],['attract','吸引'],['transfer','转移；转印'],['fuser','定影器'],['heat','热量；加热'],['pressure','压力'],['fuse','熔合；此处指将墨粉定影到纸上'],['3D printer','三维打印机'],['CAD','computer-aided design · 计算机辅助设计'],['slice','切片；把模型分为逐层打印的数据'],['layer','层'],['additive manufacturing','增材制造'],['deposit','沉积；此处指铺放材料'],['solidify','固化'],['nozzle','喷嘴'],['extrude','挤出']
 ]},
 {name:'Touch, audio & VR · 输入输出',lesson:'13',words:[
 ['touchscreen','触摸屏'],['resistive','电阻式的'],['capacitive','电容式的'],['conductive layer','导电层'],['contact','接触'],['capacitance','电容；注意区别于 capacitor（电容器）'],['coordinates','坐标'],['stylus','触控笔'],['microphone','麦克风'],['diaphragm','振膜'],['vibration','振动'],['analogue signal','模拟信号'],['digital signal','数字信号'],['ADC','analogue-to-digital converter · 模数转换器'],['DAC','digital-to-analogue converter · 数模转换器'],['speaker','扬声器'],['coil','线圈'],['cone','锥盆'],['sound wave','声波'],['amplify','放大；此处指放大电信号'],['VR headset','virtual reality headset · 虚拟现实头戴设备'],['motion sensor','运动传感器'],['viewpoint','视点；观察位置和方向'],['render','渲染；生成画面'],['latency','延迟'],['stereoscopic','立体视觉的']
 ]},
 {name:'Monitoring & control · 监测控制',lesson:'14',words:[
 ['monitoring','监测'],['control','控制'],['sensor','传感器'],['actuator','执行器'],['physical quantity','物理量'],['temperature','温度'],['infrared','红外线；红外的'],['reading','读数'],['measure','测量'],['detect','检测'],['compare','比较'],['target value','目标值'],['feedback','反馈'],['closed-loop system','闭环系统'],['adjust','调节'],['motor','电动机'],['heater','加热器'],['vent','通风口'],['record','记录'],['alert','警报；提醒']
 ]}
 ,{name:'Logic gates · 逻辑门',lesson:'15',words:[
 ['logic gate','逻辑门；对二进制输入执行逻辑运算的电路'],['binary','二进制的；使用 0 和 1 表示'],['input','输入；逻辑门接收的信号或值'],['output','输出；逻辑运算得到的信号或值'],['NOT','非；将输入取反'],['AND','与；两个输入均为 1 时输出 1'],['OR','或；至少一个输入为 1 时输出 1'],['NAND','与非；仅当两个输入均为 1 时输出 0'],['NOR','或非；仅当两个输入均为 0 时输出 1'],['XOR','exclusive OR · 异或；两个输入不同时输出 1'],['truth table','真值表；列出所有输入组合及其对应输出'],['symbol','符号；如逻辑门的标准图形'],['inversion','取反；将 0 变为 1、1 变为 0'],['inversion bubble','取反圆圈；逻辑符号中表示取反的小圆圈'],['true','真；布尔值，通常用 1 表示'],['false','假；布尔值，通常用 0 表示'],['combination','组合；如一种输入取值组合'],['at least one','至少一个'],['both','两者都'],['neither','两者都不'],['exactly one','恰好一个'],['different','不同的'],['identical','相同的']
 ]},
 {name:'Logic expressions · 逻辑表达式',lesson:'16',words:[
 ['logic circuit','逻辑电路；由相互连接的逻辑门组成的电路'],['Boolean expression','布尔表达式；由变量和逻辑运算符组成的表达式'],['Boolean variable','布尔变量；取值为真或假的变量'],['operator','运算符；如 AND、OR、NOT'],['operand','操作数；运算符作用的值或表达式'],['problem statement','问题描述；用文字说明要求和条件'],['condition','条件'],['brackets','括号；明确运算的分组'],['intermediate output','中间输出；尚未到最终结果的某一级运算输出'],['intermediate column','中间列；真值表中记录中间运算结果的列'],['cascade','级联；把一个门的输出连接到另一个门的输入'],['branch','分支；电路中的一条信号处理路径'],['signal','信号'],['evaluate','求值；计算表达式的结果'],['construct','构建；按要求画出电路或列出表格'],['derive','推导；根据已知表示得到另一种表示'],['equivalent','等价的；对每种输入组合都产生相同输出'],['binary order','二进制顺序；如 00、01、10、11'],['sum of products','积之和；把多个 AND 项用 OR 连接的表达式形式'],['AND term','与项；若干条件用 AND 连接形成的项'],['output-1 row','输出为 1 的真值表行']
 ]}
];
