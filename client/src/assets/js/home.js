

var homeObject = (function() {

    return {
        init: function() {
            //alert('Init home');
            var d = new Date(new Date().getTime() + 1000 * 120 * 120 * 2000);
    
            // default example
            simplyCountdown('.simply-countdown-one', {
                year: d.getFullYear(),
                month: d.getMonth() + 1,
                day: d.getDate()
            });
        
            //jQuery example
            $('#simply-countdown-losange').simplyCountdown({
                year: d.getFullYear(),
                month: d.getMonth() + 1,
                day: d.getDate(),
                enableUtc: false
            });

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            var chart = am4core.create("chartdiv", am4maps.MapChart);

            // Set map definition
            chart.geodata = am4geodata_worldLow;

            // Set projection
            chart.projection = new am4maps.projections.Orthographic();
            chart.panBehavior = "rotateLongLat";
            chart.deltaLatitude = -20;
            chart.padding(20, 20, 20, 20);

            // Create map polygon series
            var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

            // Make map load polygon (like country names) data from GeoJSON
            polygonSeries.useGeodata = true;
            //polygonSeries.include = ["BR", "UA", "MX", "CI"];

            // Configure series
            var polygonTemplate = polygonSeries.mapPolygons.template;
            polygonTemplate.tooltipText = "{name}";
            polygonTemplate.fill = am4core.color("#1F3444");//("#FFD700"); //#FFD700
            polygonTemplate.stroke = am4core.color("#000000");//("#1ec97a");
            polygonTemplate.strokeWidth = 0.2;
            polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            polygonTemplate.url = "#";
            polygonTemplate.urlTarget = "_blank";

            var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
            graticuleSeries.mapLines.template.line.stroke = am4core.color("#dee3e1");
            graticuleSeries.mapLines.template.line.strokeOpacity = 0.4;
            graticuleSeries.fitExtent = false;


            chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
            chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#000000");

            // Create hover state and set alternative fill color
            var hs = polygonTemplate.states.create("hover");
            hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

            let animation;
            setTimeout(function () {
                animation = chart.animate({ property: "deltaLongitude", to: 100000 }, 20000000);
            }, 1000)

            chart.seriesContainer.events.on("down", function () {
                //  animation.stop();
            })
      },
      func2: function() {
        alert('function 2 called');
      }
    }

})(homeObject||{})

