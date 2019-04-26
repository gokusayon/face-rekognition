/*
 * blueimp Gallery Demo JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global blueimp, $ */

var oldData;
function overlay(){

  el = document.getElementById("overlay");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";

}


function finish() {
     document.getElementById("overlay").style.visibility = 'hidden';
}

function submit() {
  document.getElementById("overlay").style.visibility = 'hidden';
// Load demo images from flickr:
  var newData = document.getElementById('newData').value;

  if(oldData != undefined && newData!=undefined){
    $.ajax({
      url: 'https://x2ym1s7cs3.execute-api.ap-south-1.amazonaws.com/default/get-data-rds?stage=update&new=' + newData + '&old=' + oldData,
      type:'GET'
    }).done(function (result) {
        alert('Done!!');

    });
    console.log('print');
  }
}


function upload() {
    debugger;
}


$(function () {
  'use strict'


  // var result = ["SRK", "Disha", "Emma", "Emily Ratajkowski", "asdfsadfasdf"];

function updateImgTag(data) {
  console.log('updateImgTag');
  console.log(data);
  // func.call(undefined, index)
  // console.log(index);
  // debugger;
}
function updateAlbumTag(data) {
  // console.log('updateAlbumTag');
  // console.log(data);
  // jsonData = data;
  oldData = data.Tag
  document.getElementById('oldData').value = oldData;

  document.getElementById('newData').value = "";

  overlay();
}

var modal = document.getElementById('myModal');
var index = 2;
var carouseTemplate = $( "#blueimp-image-carouse" ).clone();
$( "#blueimp-image-carouse" ).remove();

  var rowId;
  var userId;
  $.ajax({
      url: 'https://x2ym1s7cs3.execute-api.ap-south-1.amazonaws.com/default/get-data-rds?stage=fetch',
      type: 'GET'

    }).done(function (result) {
          $.each(result, function (index, row) {
                  // var index=0;
                  userId=result[index];  
                  row = result[index].replace(/[_]/g,"");
                  row = row.replace(/[ ]/g,"-");
                  var tempTemplate = carouseTemplate.clone();
                  rowId= 'carouse-'+ row  + '-' + index;
                  tempTemplate.attr('id',rowId);
                  tempTemplate.appendTo('#parent-carouse');



           // Load demo images from flickr:
                  $.ajax({
                    url: 'https://x2ym1s7cs3.execute-api.ap-south-1.amazonaws.com/default/get-data-rds?user=' + userId,
                    type:'GET'
                  }).done(function (result) {
                    

                      var carouselLinks = []
                      var linksContainer = $('#links')
                      var baseUrl, onClickId;
                          // Add the demo images as links with thumbnails to the page:
                      $.each(result, function (index, row) {
                        var tag = row['Tag'];
                        if(tag.indexOf('__') !== -1)
                          tag = "Click to change title"
                        baseUrl = row['url'];
                        onClickId = 'link-' + row['FileName'] + index;
                        $('<a/>')
                          .append($('<images>').prop('src', baseUrl))
                          .prop('href', baseUrl)
                          .prop('title', tag)
                          .attr('data-gallery', '')
                          .appendTo(linksContainer)
                          carouselLinks.push({
                            href: baseUrl ,
                            title: tag,
                            callBackItem: row
                          })

                        // $('#' + onClickId).on("click", myFunction(this));
                      });


                      // Initialize the Gallery as image carousel:
                      blueimp.Gallery(carouselLinks, {
                        container: '#carouse-'+ row  + '-' + index,
                        carousel: true,
                        onclickEvent: true,
                        onImgCallback: updateImgTag,
                        onTitleCallback: updateAlbumTag,
                        startSlideshow: false
                        
                      })/*
                      var gallery = blueimp.Gallery(
                        linkList,
                        onClick: updateTag

                    );*/
                  })

                  // return false;

                  // return false;
          // carouseTemplate.appendTo(carouseTemplate);
      });
  })



})
