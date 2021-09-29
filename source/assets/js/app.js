(function(ng){
    'use strict';
    var app= ng.module("ngLoadScript",[]);
    app.directive("script",function(){
        return {
            restrict:'E',
            scope: false,
            link:function(scope,element,attr){
                if(attr.type === "text/javascript-lazy"){var sc = document.createElement("script");
                sc.type = "text/javascript";
                var src_obj = element.attr("src");
                if (src_obj !== undefined){
                    sc.src = src_obj;
                }
                else{
                    var code = element.text();
                    sc.text = code;
                }
                // console.log(sc);
                document.body.appendChild(sc);
                element.remove();}
            }
        };
    })
}(angular));

var app = angular.module("e_learning",["ui.router","ngLoadScript","oc.lazyLoad"]);
app.controller("base_controller",function($scope, $state, $http, $httpParamSerializer){
    console.log($state.current.name);
    var state= $state.current.name;
    
    var token = localStorage.getItem("token")
    var host = "https://api.elearning.technoblocks.in"

    
    $scope.details = {
        
    }

    $scope.add_course = function(){
        console.log($scope.details);
        $http({
            url: host+"/courses/create",
            method: "POST",
            data: $httpParamSerializer($scope.details),
            headers:{
                Authorization : "Bearer "+token,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(res){
            console.log(res);
            swal("Good job!", "Course Added!", "success")
            .then(function(){
                location.reload();
            });
        },function(error){
            console.log(error);
        })
    }

    $scope.details_v = {

    }
    $scope.add_video = function(){
        console.log($scope.details_v);
        $http({
            url: host+"/videos/create/"+$scope.course_id,
            method: "POST",
            data: $httpParamSerializer($scope.details_v),
            headers:{
                Authorization : "Bearer "+token,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(res){
            console.log(res);
            swal("Good job!", "Video Added!", "success")
            .then(function(){
                location.reload();
            });
        },function(error){
            console.log(error);
        })
    }

    $scope.add_c_thumbnail = function(){
        var file_input = document.getElementById("f_upload");
        console.log(file_input.files[0]);
        var fd = new FormData();
        fd.append("file",file_input.files[0]);
        $http({
            url: host+"/courses/upload_thumbnail",
            method: "POST",
            data: fd,
            headers:{
                "Content-Type": undefined
            }
        }).then(function(res){
            console.log(res.data.filename);
            $scope.details.course_img_thumbnail = res.data.filename;
            // console.log();
        },function(error){
            console.log(error);
        })
    }

    $scope.add_v_thumbnail = function(){
        var file_input = document.getElementById("t_upload");
        console.log(file_input.files[0]);
        var fd = new FormData();
        fd.append("file",file_input.files[0]);
        $http({
            url: host+"/courses/upload_thumbnail",
            method: "POST",
            data: fd,
            headers:{
                "Content-Type": undefined
            }
        }).then(function(res){
            console.log(res.data.filename);
            $scope.details_v.video_thumbnail = res.data.filename;
            // console.log();
        },function(error){
            console.log(error);
        })
    }

    $scope.add_videoclip = function(){
        var file_input = document.getElementById("v_upload");
        console.log(file_input.files[0]);
        var fd = new FormData();
        fd.append("file",file_input.files[0]);
        console.log($scope.course_id);
        $http({
            url: host+"/videos/upload_vdo/"+$scope.course_id,
            method: "POST",
            data: fd,
            headers:{
                "Content-Type": undefined
            },
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false
        }).then(function(res){
            console.log(res.data.filename);
            $scope.details_v.video_path = res.data.filename;
            // console.log();
        },function(error){
            console.log(error);
        })
    }

    $scope.delete_course = function(id){
        console.log($scope.details);
        $http({
            url: host+"/courses/delete_permanently/"+id,
            method: "GET",
            headers:{
                Authorization : "Bearer "+token,
            }
        }).then(function(res){
            console.log(res);
            swal("Good job!", "Course Deleted!", "success")
            .then(function(){
                location.reload();
            }); 
        },function(error){
            console.log(error);
        })
    }

    $scope.delete_video = function(id){
        console.log($scope.details);
        $http({
            url: host+"/videos/delete/"+id,
            method: "GET",
            headers:{
                Authorization : "Bearer "+token,
            }
        }).then(function(res){
            console.log(res);
            swal("Good job!", "Video Deleted!", "success")
            .then(function(){
                location.reload();
            }); 
        },function(error){
            console.log(error);
        })
    }

    $scope.publish_course = function(id){
        console.log($scope.details);
        $http({
            url: host+"/courses/publish_course/"+id,
            type: "GET",
            headers: {
                "Authorization":"Bearer "+token
            },
        }).then(function(res){
            console.log(res);
            swal("Good job!", "Course Published!", "success")
            .then(function(){
                location.reload();
            }); 
        },function(error){
            console.log(error);
        })
    }

    $scope.deactivate_course = function(id){
        console.log($scope.details);
        $http({
            url: host+"/courses/delete/"+id,
            type: "GET",
            headers: {
                "Authorization":"Bearer "+token
            },
        }).then(function(res){
            console.log(res);
            swal("Good job!", "Course Deleted Succcessfully!", "success")
            .then(function(){
                location.reload();
            }); 
        },function(error){
            console.log(error);
        })
    }

    $scope.restore_course = function(id){
        console.log($scope.details);
        $http({
            url: host+"/courses/publish_course/"+id,
            type: "GET",
            headers: {
                "Authorization":"Bearer "+token
            },
        }).then(function(res){
            console.log(res);
            swal("Good job!", "Course Restored!", "success")
            .then(function(){
                location.reload();
            }); 
        },function(error){
            console.log(error);
        })
    }

    var params = new URLSearchParams(window.location.search);
    $scope.course_id = params.get("c_id");
    // console.log($scope.course_id);

    $scope.is_disabled = true;
    $scope.edit = false;
    $scope.view = true;
    $scope.update = true;

    $scope.toggleReadonly = function(action){
        if (action=="enable"){
            $scope.is_disabled= false;
            $scope.edit = true;
            $scope.view = false;
            $scope.update = false;
        }
        else{
            $scope.is_disabled= true;
            $scope.edit = false;
            $scope.view = true;
            $scope.update = true;
        }  
    }  

    

    $scope.edit_course = function(){
        console.log($scope.course_id);              
        $http({
            url: host+"/courses/update/"+$scope.course_id,
            method: "POST",
            data: $httpParamSerializer($scope.course),
            headers: {
                "Authorization":"Bearer "+token,
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            success:function(res){
                swal("Good job!", "Course Updated!", "success")
                .then(function(){
                    location.reload();
                });
            }
        });
        console.log($scope.course);  
    }

    $scope.profile_pic = function(){
        var file_input = document.getElementById("p_upload");
        // console.log(file_input.files[0]);
        var fd = new FormData();
        fd.append("file",file_input.files[0]);
        $http({
            url: host+"/courses/upload_thumbnail",
            method: "POST",
            data: fd,
            headers:{
                "Content-Type": undefined
            }
        }).then(function(res){
            console.log(res.data.filename);
            $scope.register_c.img_path = res.data.filename;
        },function(error){
            console.log(error);
        })
    }

    $scope.edit_profile = function(){
        $http({
            url: host+"/users/update",
            method: "POST",
            data: $httpParamSerializer($scope.my_profile),
            headers: {
                "Authorization":"Bearer "+token,
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            success:function(res){
                console.log(res);
                location.reload();
            }
        });
        console.log($scope.my_profile);
    };
    

    
    $scope.edit_v = function(details_v){
        $scope.data = details_v;
        console.log($scope.data);
        $scope.v_id = $scope.data.id;
        console.log($scope.v_id);
    }

    $scope.edit_video = function(){
        $http({
            url: host+"/videos/update/"+$scope.v_id,
            method: "POST",
            data: $httpParamSerializer($scope.data),
            headers: {
                "Authorization":"Bearer "+token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success:function(res){
                swal("Good job!", "Video Updated!", "success")
                    .then(function(){
                        location.reload();
                    });
            }
        });
        console.log($scope.data);
    }

    // $("#video_edit").submit(function(e){
    //     e.preventDefault();
    //     var v_update = $("#video_edit").serializeArray();
    //     console.log(v_update);

    //     v_update.push({
    //         name:"course_id" , value:course_id
    //     })


    
    $scope.states={
        dashboard:function(){
            $http({
                url: host+"/enrollments/total_enrollments",
                method: "GET",
                headers:{
                    Authorization : "Bearer "+token
                }
            }).then(function(res){
                console.log(res.data.payload[0].enrollment_count);
                $scope.e_count = res.data.payload[0].enrollment_count;
            },function(error){
                console.log(error);
            });
            $http({
                url: host+"/courses/total_courses",
                method: "GET",
                headers:{
                    Authorization : "Bearer "+token
                }
            }).then(function(res){
                console.log(res.data.payload[0].course_count);
                $scope.c_count = res.data.payload[0].course_count;
            },function(error){
                console.log(error);
            });
            $http({
                url: host+"/videos/total_videos",
                method: "GET",
                headers:{
                    Authorization : "Bearer "+token
                }
            }).then(function(res){
                console.log(res.data.payload[0].video_count);
                $scope.v_count = res.data.payload[0].video_count;
            },function(error){
                console.log(error);
            })
        },
        add_course:function(){
            
        },
        pending_courses:function(){
            $http({
                url: host+"/courses/pending_courses",
                method: "GET",
                headers:{
                    Authorization : "Bearer "+token
                }
            }).then(function(res){
                console.log(res.data.payload);
                $scope.p_courses = res.data.payload;
            },function(error){
                console.log(error);
            })
        },
        videos:function(){
            $http({
                url: host+"/courses/read/"+$scope.course_id,
                method: "GET",
                headers:{
                    Authorization : "Bearer "+token
                }
            }).then(function(res){
                console.log(res.data.payload[0]);
                $scope.course = res.data.payload[0];
            },function(error){
                console.log(error);
            });
            $http({
                url: host+"/videos/video_details/"+$scope.course_id,
                method: "GET",
                headers:{
                    Authorization : "Bearer "+token
                }
            }).then(function(res){
                console.log(res.data.payload);
                $scope.videos = res.data.payload;
            },function(error){
                console.log(error);
            })
        },
        active_courses:function(){
            $http({
                url: host+"/courses/active_courses",
                method: "GET",
                headers:{
                    Authorization : "Bearer "+token
                }
            }).then(function(res){
                // console.log(res.data.payload);
                $scope.a_courses = res.data.payload;
            },function(error){
                console.log(error);
            })
        },
        deactivated_courses:function(){
            $http({
                url: host+"/courses/deleted_courses",
                method: "GET",
                headers:{
                    Authorization : "Bearer "+token
                }
            }).then(function(res){
                // console.log(res.data.payload);
                $scope.d_courses = res.data.payload;
            },function(error){
                console.log(error);
            })
        },
        my_profile:function(){
            $http({
                url: host+"/users/get_single_user_details",
                method: "GET",
                headers:{
                    Authorization : "Bearer "+token
                }
            }).then(function(res){
                console.log(res.data.payload[0]);
                $scope.my_profile = res.data.payload[0];
            },function(error){
                console.log(error);
            })
        },
        enrollments:function(){
            $http({
                url: host+"/enrollments/read_in",
                method: "GET",
                headers:{
                    Authorization : "Bearer "+token
                }
            }).then(function(res){
                // console.log(res.data.payload);
                $scope.enrollments = res.data.payload;
            },function(error){
                console.log(error);
            })
        }
    }
    $scope.states[state]();
})

app.controller("login_ctrl",function($scope, $state, $http, $httpParamSerializer){

    var host = "https://api.elearning.technoblocks.in:8080"

    var token = localStorage.getItem("token")

    $scope.login_c = {
        
    }

    $scope.login = function(){
        console.log($scope.login_c);
        $http({
            url: host+"/users/login",
            method: "POST",
            data: $httpParamSerializer($scope.login_c),
            headers:{
                Authorization : "Bearer "+token,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(res){
            console.log(res.data.payload);
            localStorage.setItem("token", res.data.payload);
            location.href="https://instructor.elearning.technoblocks.in:8585/"
        },function(error){
            console.log(error);
        })
    }

    $scope.logout = function(){
        localStorage.clear();
        location.href="https://instructor.elearning.technoblocks.in:8585/login";
    }

    $scope.add_file = function(){
        var file_input = document.getElementById("i_upload");
        console.log(file_input.files[0]);
        var fd = new FormData();
        fd.append("file",file_input.files[0]);
        $http({
            url: host+"/courses/upload_thumbnail",
            method: "POST",
            data: fd,
            headers:{
                "Content-Type": undefined
            }
        }).then(function(res){
            console.log(res.data.filename);
            $scope.register_c.img_path = res.data.filename;
        },function(error){
            console.log(error);
        })
    }

    $scope.register_c = {

    }

    $scope.register = function(){
        $http({
            url: host+"/users/create_in",
            method: "POST",
            data: $httpParamSerializer($scope.register_c),
            headers:{
                Authorization : "Bearer "+token,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(res){
            console.log(res);
            location.href="https://instructor.elearning.technoblocks.in:8585/"
        },function(error){
            console.log(error);
        })
    }

    $scope.forget_password = function(){
        alert("kjdjbb");
    }
    
})
