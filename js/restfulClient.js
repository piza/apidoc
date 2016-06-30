(function(){
    var restfulClient={};

    var appName="http://localhost:8080/family";
    var backendUrl=appName+"/api/v1";
    window.rsClient=restfulClient;
    window.restfulClient=restfulClient;

    restfulClient.defaultOption={
        before:function(){
            //console.log("");
        },
        error:function(err,str){
            if(layer){
                layer.msg(str);
            }else{
                console.log(str);
            }
        }
    };

    /**
     * 保存方法，
     * @param url
     * @param data
     * @param success
     * @param before
     * @param failed 自定义callback，服务器返回data 有failed字段，就会call这个方法
     */
    restfulClient.post=function(url,data,success,option){
        var syncOption={
            "httpType":"POST",
            "success":success,
            "data":data,
            "option":option || restfulClient.defaultOption
        };
        restfulClient.syncData(url,syncOption);
    };
    /**
     * 保存方法，
     * @param url
     * @param data
     * @param success
     * @param before
     * @param failed 自定义callback，服务器返回data 有failed字段，就会call这个方法
     */
    restfulClient.put=function(url,data,success,option){
        var syncOption={
            "httpType":"PUT",
            "success":success,
            "data":data,
            "option":option || restfulClient.defaultOption
        };
        restfulClient.syncData(url,syncOption);
    };
    /**
     *
     * @param url
     * @param success
     * @param failed
     */
    restfulClient.get=function(url,success,option){
        var syncOption={
            "httpType":"GET",
            "success":success,
            "option":option || restfulClient.defaultOption
        };
        restfulClient.syncData(url,syncOption);
    };

    /**
     *
     * @param url
     * @param success
     * @param failed
     */
    restfulClient.remove = function(url,success,option){
        var syncOption={
            "httpType":"DELETE",
            "success":success,
            "option":option || restfulClient.defaultOption
        };
        restfulClient.syncData(url,syncOption);
    };

    restfulClient.syncData=function(url,syncOption){
        var ajaxOption={
            url: backendUrl+url,
            type:syncOption.httpType,
            contentType:"application/json;charset=utf-8",
            //headers:{"token":restfulClient.getToken()},
            cache:false,
            async:syncOption.option.hasOwnProperty("async") ? syncOption.option.async:true,
            beforeSend:syncOption.option.before,
            success: function(data) {
                 syncOption.success(data);
            },
            error:function(err,errStr){
                console.log(err);
                console.log(errStr);
            },
            statusCode: {
                400: function() {
                    alert('400 status code! user error');
                },
                404: function() {
                    alert('404 status code! wrong url error');
                },
                500: function() {
                    alert('500 status code! server error');
                }
            }
        };
        if(syncOption.httpType=="POST" || syncOption.httpType=="PUT"){
            ajaxOption.data=JSON.stringify(syncOption.data)
        }
        $.ajax(ajaxOption);

    };

    restfulClient.globalException=function(failedData){
        console.log(failedData);
    };

})();