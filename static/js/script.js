function refreshTable( x )
{
  x = JSON.parse(x)
  $("#table").html("<tr><th>name</th><th>cost</th></tr>");
  for (i of x)
  {
    row = "<tr><td>"+i.name+"</td><td>"+i.cost+"</td></tr>";
    $("#table").html($("#table").html()+row);
    //table.html += row
  }
}

var tableData = $.ajax(
  {
    url: "/item/",
    method: "GET"
  }
);
tableData.done(refreshTable);
tableData.fail(function( jqXHR, textStatus ) {
  alert( "Request failed: " + textStatus + JSON.stringify(jqXHR) );
});

$("#save").click(
  function()
  {
    var name = $("#name").val();
    var cost = $("#cost").val();
    out = {name:name,cost:cost};
    $.post(
      "/item/",
      out,
      refreshTable
    )
  }
);

setInterval(
  function(x) //repeated function
  {
    var tableData = $.ajax(
      {
        url: "/item/",
        method: "GET"
      }
    );
    tableData.done(refreshTable);
    tableData.fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus + JSON.stringify(jqXHR) );
    });
  },
  10000 //interval in ms
)
