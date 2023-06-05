



import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import axios from "axios";
import Topbar from "../global/Topbar";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [stat, setStat] = useState([]);
  useEffect(() => {
    fetchData()
    fetchUsers()
  }, []);

  const fetchData = async () => {
    try {
      
      const response = await axios.get('http://localhost:8080/details/ErrorWithFiles');
    
      const transformedData = response.data.map((item , index)=> ({
       
        id: item.id,
        label: "id file:"+item.id,
        value: item.value,
       // color: "hsl(104, 70%, 50%)",
       color: index < data.findIndex((obj) => obj.id === "desired-id")
       ? `hsl(${Math.random() * 360}, 70%, 50%)`
       : "hsl(104, 70%, 50%)",
      }));
      setData(transformedData);
      
      
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      
      const response = await axios.get('http://localhost:8080/api/v1/auth/statistics');
    
      const transformedStat = response.data.map((item , index)=> ({
       
        id: item.id,
        label: "user id: "+item.id,
        value: item.value,
       // color: "hsl(104, 70%, 50%)",
       color: index < stat.findIndex((obj) => obj.id === "desired-id")
       ? `hsl(${Math.random() * 360}, 70%, 50%)`
       : "hsl(104, 70%, 50%)",
      }));
      setStat(transformedStat);
      
      
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  
  return (
    <div>
      <Topbar></Topbar>
      
     
        
    <div style={{ height: "400px", marginLeft:"25%", display: 'flex',  justifyContent: 'space-between' , marginTop:'10%'}} >
    <div style={{ flexBasis: '45%' }}>
      <p style={{marginLeft:'17%'}}>Nombre d'erreurs dans chaque fichier</p>
    <ResponsivePie
      data= {data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
         
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
 
 </div>
<div style={{ flexBasis: '45%' }} >
  <p style={{marginLeft:'25%'}}>Activité de chaque Médecin</p>
<ResponsivePie
      data= {stat}
      
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
      
    />
 
 </div>
    </div>
    
    
    
</div>



 
  );
};

export default PieChart;











