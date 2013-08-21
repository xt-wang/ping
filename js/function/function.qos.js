/**
 * Qos测速函数。
 * @param _name: 测试接口名，最终组合为 tcomment + _name
 * @param _baseTimestamp: 基准时间戳
 * @param _timestamps: 各参数时间戳对象，e.g. {1: newDate().getTime(), 2: 1350881412511}，1 和 2为Qos接口查询参数名
 */
function Qoss(_name, _baseTimestamp, _timestamps, _randomRange) {
    //随机采样
    if(_randomRange) {
        var _lucky = parseInt(Math.random() * _randomRange);
        if (_lucky) {
            return;
        }
    }
    for(var _idx in _timestamps) {
        _timestamps[_idx] -= _baseTimestamp;
    }
    jQuery('<img src="http://qos.report.qq.com/collect?type=1&name=coral_qq_com_' + _name + '&' + jQuery.param(_timestamps) + '">')
        .error(function(){jQuery(this).remove();})
        .load(function(){jQuery(this).remove();})
        .appendTo('body');
}
