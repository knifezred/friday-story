# 禁止menu嵌套，可以jump到其他label再次设置menu
label start:
    $ scene.cover="/resources/demo/t8.webp"
    # "{color=#4542ee}镜子{/color}倒映着{b}[me.username]{/b}的脸"
    "周五下班的你在地铁上无聊的刷着手机"
    scene "/resources/demo/t1.webp"
    "突然一阵{color=#ff4757}晕眩{/color}，你两眼漆黑倒在了地上"
    show sister normal at center
    anon "又一个..."
    "不知道过了多久，你再次醒来"
    scene "/resources/demo/t2.webp"
    hide sister normal
    "你发现身处竹林之中，只听得风吹竹林的沙沙声"
    "你决定走进竹林身处"
    "你发现一个老者和棋盘"
    anon "你来了"
    anon "与我手谈一把可好，我可让你一子"
    menu optional_select_world:
        "双鱼佩":
            $ effect.setFlag("world.type,PiscesPendant")
            "你选择了双鱼佩"
        "昊天眼":
            $ option.isDisabled="True"
            $ effect.single
            $ effect.setFlag("world.type,HaotianEye")
            "你选择了昊天眼"
        "炼妖壶":
            $ option.isDisabled="True"
            $ effect.single
            $ effect.setFlag("world.type,LianyaoFlask")
            "你选择了炼妖壶"
    anon "若想回去，就来天元山找我吧，哈哈哈..."
    $ finish


# 武罗山洞
label wuluo_hole:
    $ isEnd
    scene "/resources/demo/t0.webp"
    "一个寂静的山洞，传说中有妖兽"
    menu optional_explore:
        "一探究竟":
            "你鼓起勇气进入山洞"
            jump wuluo_hole_event
        "从长计议":
            "你决定先休整一番，再做打算"
    "你退出了山洞"

label wuluo_hole_end:
    "武罗已经消失不见"
    "此地仅存一处破败的洞穴"
    "你退出了山洞"

label wuluo_hole_event:
    scene "/resources/demo/t1.webp"
    "小心探索"
    show wuLuo normal
    wuLuo "站住"
    wuLuo "要想出去，就拿{color=#ff4757}一罐牛奶{/color}来换"
    menu give_pearl:
        "交付牛奶":
            $ condition.execute.hasItem("food.milk,1")&hasItem("food.cola,1")
            $ effect.useItem("food.milk,1")
            $ effect.unlockMap("root.world.baiYuan.portal")
            $ effect.unlockMap("root.world.yongNing.portal")
            "你将{color=#ff4757}牛奶{/color}交给武罗，她随机为你打开了通往外界的传送门"
            "传送门已开，请返回洞外查看"
            $ finish
        "下次一定":
            "你决定先去附近城镇转转，再做打算"
    "这里一览无余，没有探查的必要，你决定退出山洞"
