/**
 * Created by Olamide on 24/03/2018.
 */

$(document).ready(function(){
    function process(){
        $('#processingRequest').modal();
    }
    var eachBodyWord;
    function cutBodyContent(fullWords) {
        eachBodyWord = fullWords;
        var eachBodyWordArray = fullWords.split(" ");
        if (eachBodyWordArray.length > 60){
            eachBodyWordArray = eachBodyWordArray.slice(0,60);
            eachBodyWord = eachBodyWordArray.join(' ') + "....  Click Below For More";
        }
        return eachBodyWord;
    }

    if($('#indexBody').data('title') === 'index') {
        $.ajax({
            url: "https://kw-blog.herokuapp.com/posts",
            type: "get",
            contentType: 'application/json',
            dataType: "json",
            error: function () {
                document.getElementById('words').innerHTML = "Error Loading request! Refresh to Try Again";
                $('#processingRequest').modal();
            },
            success: function (response) {
                $('#processingRequest').modal('hide');
                var allPosts = response.posts;
                var middleSection = document.getElementById('middlePageSection');
                allPosts.forEach(function (eachPost) {
                    var eachPostSection = document.createElement('div');
                    eachPostSection.classList.add("col-lg-12", "col-md-12", "col-sm-12", "col-xs-12", "blog-card", "margin-bottom");
                    var postTitle = document.createElement('div');
                    postTitle.classList.add("text-center", 'text-uppercase', 'margin-top', 'margin-bottom', 'post-body', 'title', 'pad-right', 'pad-left', 'pad-top', "pad-bottom");
                    postTitle.innerHTML = eachPost.title;
                    eachPostSection.appendChild(postTitle);
                    // start image section
                    var mainDiv = document.createElement('div');
                    mainDiv.classList.add("container-fluid", "margin-bottom", "pad-for-grid-columns");
                    var div1 = document.createElement('div');
                    div1.classList.add('col-lg-4', 'col-md-4', 'col-sm-4', 'col-xs-4', 'gallery', 'thumbnail');
                    var image1 = document.createElement('img');
                    image1.classList.add('img-responsive', 'img-thumbnail');
                    image1.src = "img/image1.JPG";
                    div1.appendChild(image1);
                    mainDiv.appendChild(div1);
                    var div2 = document.createElement('div');
                    div2.classList.add('col-lg-4', 'col-md-4', 'col-sm-4', 'col-xs-4', 'gallery', 'thumbnail');
                    var image2 = document.createElement('img');
                    image2.classList.add('img-responsive', 'img-thumbnail');
                    image2.src = "img/image2.JPG";
                    div2.appendChild(image2);
                    mainDiv.appendChild(div2);
                    var div3 = document.createElement('div');
                    div3.classList.add('col-lg-4', 'col-md-4', 'col-sm-4', 'col-xs-4', 'gallery', 'thumbnail');
                    var image3 = document.createElement('img');
                    image3.classList.add('img-responsive', 'img-thumbnail');
                    image3.src = "img/image2.JPG";
                    div3.appendChild(image3);
                    mainDiv.appendChild(div3);
                    eachPostSection.appendChild(mainDiv);
                    // End Image section
                    var postBody = document.createElement('div');
                    postBody.classList.add('text-left', 'post-body', 'pad-right', 'pad-left', 'pad-top', 'pad-bottom');
                    var bodyContent = document.createElement('p');
                    bodyContent.classList.add("pad-top");
                    cutBodyContent(eachPost.body);
                    bodyContent.innerHTML = eachBodyWord ;
                    postBody.appendChild(bodyContent);

                    var link = document.createElement('a');
                    link.classList.add('text-uppercase', 'btn', 'my-button', 'text-center', 'pad-top', 'no-margin-bottom');
                    link.href = "blog-post.html?id=" + eachPost._id;
                    link.innerHTML = 'Read More';
                    link.id = "readMore";
                    var icon = document.createElement('span');
                    icon.classList.add("pad-left", "glyphicon", "glyphicon-arrow-right");
                    link.appendChild(icon);
                    var linkSection = document.createElement('p');
                    linkSection.classList.add("text-center", "pad-top", "no-margin-bottom");
                    linkSection.appendChild(link);

                    postBody.appendChild(linkSection);
                    eachPostSection.appendChild(postBody);
                    middleSection.appendChild(eachPostSection);
                });
                var next = document.getElementById('nextPage');
                next.style.display = 'block';
                middleSection.appendChild(next);
            }
        });
        process();

        // $('#subscribe').click(function () {
        //
        // });
    }

    else if($('#singlePost').data('title') === 'blogPost') {
        // //     var read = document.getElementById('readMore');
        document.getElementById('edit').style.display = 'none';
        document.getElementById('delete').style.display = 'none';
        var url = window.location.href;
        var getIdentity = url.split("id");
        var getId = getIdentity[1].split('=');
        var id = getId[1];
        var newURL = "https://kw-blog.herokuapp.com/posts/" + id;
        $.ajax({
                url: newURL,
                type: "get",
                contentType: 'application/json',
                dataType: "json",
                error: function () {
                    document.getElementById('words').innerHTML = "Error Loading request! Refresh to Try Again";
                    // document.getElementById('onePost').style.paddingRight = 0;
                    $('#processingRequest').modal();
                },
                success: function (response) {
                    document.getElementById('edit').style.display = 'block';
                    document.getElementById('delete').style.display = 'block';
                    $('#processingRequest').modal('hide');
                    var singlePostDetails = response.post;
                    var singlePostHolder = document.getElementById('singlePostHolder');
                    var singlePostTitle = document.createElement('div');
                    singlePostTitle.classList.add("text-center","text-uppercase","margin-top","post-body","pad-right","pad-left");
                    var titleContent = document.createElement('p');
                    titleContent.classList.add("title","no-margin-bottom","pad-top","pad-bottom");
                    titleContent.innerHTML = singlePostDetails.title;
                    singlePostTitle.appendChild(titleContent);
                    singlePostHolder.appendChild(singlePostTitle);
                    var author = document.createElement('p');
                    author.classList.add("text-center");
                    author.innerHTML = 'Published by ';
                    var bold = document.createElement('b');
                    bold.innerHTML = 'Khairah';
                    author.appendChild(bold);
                    singlePostHolder.appendChild(author);
                    var imageSection = document.createElement('div');
                    imageSection.classList.add("pad-for-grid-columns","margin-bottom");
                    var image = document.createElement('img');
                    image.classList.add('img-responsive');
                    image.src = "img/image3.JPG";
                    imageSection.appendChild(image);
                    singlePostHolder.appendChild(imageSection);
                    var singlePostBody = document.createElement('div');
                    singlePostBody.classList.add("text-left","pad-right","pad-left","pad-top","pad-bottom");
                    var singlePostBodyContent = document.createElement('p');
                    singlePostBodyContent.classList.add("margin-top","margin-bottom","post-body","pad-left","pad-right","blog-body");
                    singlePostBodyContent.innerHTML = singlePostDetails.body;
                    singlePostBody.appendChild(singlePostBodyContent);
                    singlePostHolder.appendChild(singlePostBody);
                    document.getElementById('edit').style.display = 'block';
                    document.getElementById('delete').style.display = 'block';
                    var editPost = document.getElementById('edit');
                    editPost.href = 'edit.html?id=' + singlePostDetails._id;
                }
            });
        process();
        $('#deleteBtn').click(function () {
            $('#deleteBox').modal('hide');
            $.ajax({
                url: newURL,
                type: "delete",
                contentType: 'application/json',
                dataType: "json",
                error: function () {
                    document.getElementById('words').innerHTML = "Error Loading request. Try Again!!";
                    $('#processingRequest').modal();
                },
                success: function () {
                    $('#processingRequest').modal('hide');
                    $('#deleteSuccess').modal();
                }
            });
            document.getElementById('singlePost').style.paddingRight = 0;
            process();

        });
    }

    if($('#editCreatePost').data('title') === 'editPost') {
        var newURL1;
        var url1 = window.location.href;
        var getIdentity1 = url1.split("id");
        if (typeof getIdentity1 === "object" && getIdentity1.length === 2) {
                var getId1 = getIdentity1[1].split('=');
                var id1 = getId1[1];
                newURL1 = "https://kw-blog.herokuapp.com/posts/" + id1;
                $.ajax({
                    url: newURL1,
                    type: "get",
                    contentType: 'application/json',
                    dataType: "json",
                    error: function () {
                        document.getElementById('words').innerHTML = "Error Loading request! Refresh to Try Again";
                        $('#processingRequest').modal();
                    },
                    success: function (response) {
                        $('#processingRequest').modal('hide');
                        $("#headOfPost").val(response.post.title);
                        document.getElementById('bodyOfPost').innerHTML = response.post.body;
                    }
                });
                process();

                $('#save').click(function () {
                var titleOfPost = $("#headOfPost").val();
                var bodyOfPost = $("#bodyOfPost").val();
                // console.log(bodyOfPost);
                    newURL1 = "https://kw-blog.herokuapp.com/posts/update/" + id1;
                $.ajax({
                    url: newURL1,
                    type: "post",
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify({
                        title: titleOfPost,
                        body: bodyOfPost
                    }),
                    error: function () {
                        $("#processingRequest").modal('hide');
                        document.getElementById('wordsForSuccess').innerHTML = "Error Loading Request. Try Again";
                        $('#close').attr('data-dismiss','modal');
                        document.getElementById('editCreatePost').style.paddingRight = 0;
                        $('#postSuccess').modal();
                    },
                    success: function () {
                        $("#processingRequest").modal('hide');
                        $('#postSuccess').modal();
                    }
                });
                process();
            });
        }
        else {
            $('#save').click(function () {
                var titleOfPost = $("#headOfPost").val();
                var bodyOfPost = $("#bodyOfPost").val();
                // console.log(bodyOfPost);
                $.ajax({
                    url: "https://kw-blog.herokuapp.com/posts",
                    type: "post",
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify({
                        title: titleOfPost,
                        body: bodyOfPost
                    }),
                    error: function () {
                        $("#processingRequest").modal('hide');
                        document.getElementById('wordsForSuccess').innerHTML = "Error Loading Request. Try Again";
                        $('#close').attr('data-dismiss', 'modal');
                        document.getElementById('editCreatePost').style.paddingRight = 0;
                        $('#postSuccess').modal();
                    },
                    success: function () {
                        document.getElementById('wordsForSuccess').innerHTML = "Post Published!!";
                        $("#processingRequest").modal('hide');
                        $('#postSuccess').modal();
                    }
                });
                process();
            });
        }
    }
});








    // make the page scroll


