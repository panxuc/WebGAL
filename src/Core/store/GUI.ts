/**
 * 记录当前GUI的状态信息，引擎初始化时会重置。
 */
import {useState} from "react"


/**
 * @enum
 * 当前Menu页面显示的Tag
 */
enum MenuPanelTag {
    Save,//“保存”选项卡
    Load,//“读取”选项卡
    Option//“设置”选项卡
}

/**
 * @interface
 * GUI状态类型
 */
interface IGuiState {
    showTitle: boolean, //是否显示标题界面
    showMenuPanel: boolean, //是否显示Menu界面
    currentMenuTag: MenuPanelTag,//当前Menu界面的选项卡
    titleBgm: string,//标题背景音乐
    titleBg: string//标题背景图片
}

/**
 * @interface
 * 初始GUI状态表
 */
const initState: IGuiState = {
    showTitle: true,
    showMenuPanel: false,
    currentMenuTag: MenuPanelTag.Option,
    titleBg: '',
    titleBgm: ''
}

//GUI各组件是否显示
type componentsVisibility = Pick<IGuiState, Exclude<keyof IGuiState, 'currentMenuTag' | 'titleBg' | 'titleBgm'>>
//标题资源
type GuiAsset = Pick<IGuiState, 'titleBgm' | 'titleBg'>


/**
 * 创建GUI的状态管理
 * @return {IGuiState} GUI状态
 * @return {function} 改变组件可见性
 * @return {function} 改变Menu页面的选项卡
 */
export function GuiStateStore() {
    const [GuiState, setGuiState] = useState(initState);
    const setVisibility = <K extends keyof componentsVisibility>(key: K, value: boolean) => {
        GuiState[key] = value;
        setGuiState({...GuiState});
    }

    const setMenuPanelTag = (value: MenuPanelTag) => {
        GuiState.currentMenuTag = value;
        setGuiState({...GuiState});
    }

    const setGuiAsset = <K extends keyof GuiAsset>(key: K, value: string) => {
        GuiState[key] = value;
        setGuiState({...GuiState});
    }

    return {
        GuiState,
        setGuiAsset,
        setVisibility,
        setMenuPanelTag
    }
}