# 禁止menu嵌套，可以jump到其他label再次设置menu
label start:
    $ scene.cover="/static/imgs/t0.webp"
    "周五下班的你在地铁上无聊的刷着手机"
    scene "/static/imgs/t1.webp"
    "突然一真晕眩，你两眼漆黑倒在了地上"
    "不知道过了多久，你再次醒来"
    scene "/static/imgs/t2.webp"
    "缓过神来的你发现，地上散落着几张卡牌"
    menu optional_select_world:
        "玄幻修仙":
            $ effect.setFlag("world.type,immortal")
            "你选择了修仙世界"
        "都市生活":
            $ effect.single
            $ effect.setFlag("world.type,city")
            "你选择了都市世界"

    show sister happy
    sister "hello world"
    jump dark_room

# 小黑屋
label dark_room:
    scene "/static/map/building/darkHouse.jpeg"
    "这是一间小黑屋"
    "你快要冻死了"
    "你决定去寻找木材"
    menu optional_find_wood:
        "四处翻找":
            $ effect.addItem("material.wood,5-10")
            "你找到了一些木材"
            "你发现了一面镜子"
            jump watch_mirror
        "出门查看":
            "你被冻死了"

    player "也许我该点燃一个火堆"

# 照镜子
label watch_mirror:
    "镜子倒映着你的脸"
    menu watch_mirror_option:
        "改名":
            player "我的名字是 [player.name]!"
            #block of code to run
        "加点":
            $ option.isDisabled="True"
            "暂未开放"
            #block of code to run