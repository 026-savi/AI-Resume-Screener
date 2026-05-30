import { useState } from "react";
import axios from "axios";
import { Bell, Upload, Search } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

const COLORS = ["#A7F3D0", "#C4B5FD", "#FED7AA"];

function App() {

  const [jd, setJd] = useState("");
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const exportReport = () => {

if(result.length===0){

alert("No analysis data found!");

return;

}

const csvRows = [

["Rank","Candidate","Score","Skills Match","Missing Skills"],

...result.map((candidate,index)=>([

index+1,

candidate.candidate,

`${candidate.score}%`,

"Python, SQL",

"Docker"

]))

];

const csvContent = csvRows
.map(row=>row.join(","))
.join("\n");

const blob = new Blob(
[csvContent],
{ type:"text/csv" }
);

const url = window.URL.createObjectURL(blob);

const link = document.createElement("a");

link.href = url;

link.download = "Resume_Analysis_Report.csv";

link.click();

};

  const analyzeResume = async () => {

    if (!jd.trim() || files.length === 0) {
      alert("Enter JD + Upload Resume");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("jd", jd);

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {

      const response = await axios.post(
        "https://ai-resume-screener-nu3v.onrender.com/analyze",
        formData
      );

      console.log(response.data);

      setResult(response.data.results || []);

    } catch (err) {

      console.log(err);
      alert("Backend Error");

    }

    setLoading(false);

  };

  const scoreData = result.map(item => ({
    name: item.candidate,
    score: item.score
  }));

  const pieData = [
    { name: "Strong", value: 5 },
    { name: "Medium", value: 3 },
    { name: "Weak", value: 2 }
  ];

  return (

    <div className="flex min-h-screen bg-[#F8FAFC]">

      {/* PREMIUM SIDEBAR */}

<div className="w-72 bg-gradient-to-b from-[#F4F1FF] to-[#ECE6FF] p-8 shadow-2xl border-r border-slate-200">

<h1 className="text-5xl font-extrabold mb-14 tracking-tight">

<span className="text-[#7C3AED]">
Resume
</span>

<span className="text-slate-900">
AI
</span>

</h1>

<nav className="space-y-4">

<a
href="#dashboard"
className="group flex items-center gap-4 px-5 py-4 rounded-2xl
bg-white/60 backdrop-blur-md
hover:bg-[#7C3AED]
hover:text-white
hover:scale-[1.03]
shadow-md
transition-all duration-300"
>

<span className="text-xl">
📊
</span>

<span className="font-semibold">
Dashboard
</span>

</a>

<a
href="#upload"
className="group flex items-center gap-4 px-5 py-4 rounded-2xl
bg-white/60 backdrop-blur-md
hover:bg-[#7C3AED]
hover:text-white
hover:scale-[1.03]
shadow-md
transition-all duration-300"
>

<span className="text-xl">
📄
</span>

<span className="font-semibold">
Upload Resumes
</span>

</a>

<a
href="#analytics"
className="group flex items-center gap-4 px-5 py-4 rounded-2xl
bg-white/60 backdrop-blur-md
hover:bg-[#7C3AED]
hover:text-white
hover:scale-[1.03]
shadow-md
transition-all duration-300"
>

<span className="text-xl">
📈
</span>

<span className="font-semibold">
Analytics
</span>

</a>

<a
href="#ranking"
className="group flex items-center gap-4 px-5 py-4 rounded-2xl
bg-white/60 backdrop-blur-md
hover:bg-[#7C3AED]
hover:text-white
hover:scale-[1.03]
shadow-md
transition-all duration-300"
>

<span className="text-xl">
🏆
</span>

<span className="font-semibold">
Ranking
</span>

</a>

<button
onClick={exportReport}
className="group flex items-center gap-4 px-5 py-4 rounded-2xl
bg-white/60 backdrop-blur-md
hover:bg-[#7C3AED]
hover:text-white
hover:scale-[1.03]
shadow-md
transition-all duration-300
w-full text-left"
>

<span className="text-xl">
⬇️
</span>

<span className="font-semibold">
Export Report
</span>

</button>



</nav>



</div>

      {/* MAIN */}

      <div className="flex-1 p-10">

        {/* NAVBAR */}

        <div className="flex justify-between mb-10">

          <div className="flex items-center bg-white rounded-2xl shadow px-5 py-3 w-96">

            <Search size={20} />

            <input
              placeholder="Search Candidate"
              className="ml-3 outline-none w-full"
            />

          </div>

          <Bell />

        </div>

        <h1 className="text-5xl font-bold mb-8">
          AI Resume Dashboard
        </h1>

        <div id="dashboard">

          {/* KPI */}

          <div className="grid grid-cols-3 gap-6 mb-10">

            {/* Total Candidates */}

            <div className="bg-[#BFDBFE] rounded-3xl p-6 shadow-lg">

              <h2 className="text-lg text-slate-700">
                Total Candidates
              </h2>

              <p className="text-5xl font-bold mt-3">
                {result?.length || 0}
              </p>

            </div>

            {/* Average Score */}

            <div className="bg-[#A7F3D0] rounded-3xl p-6 shadow-lg">

              <h2 className="text-lg text-slate-700">
                Average Score
              </h2>

              <p className="text-5xl font-bold mt-3">

                {
                  result?.length > 0

                    ? `${(
                      result.reduce(
                        (a, b) => a + b.score,
                        0
                      )
                      / result.length
                    ).toFixed(1)}%`

                    : "0%"
                }

              </p>

            </div>

            {/* Missing Skills */}

            <div className="bg-[#C4B5FD] rounded-3xl p-6 shadow-lg">

              <h2 className="text-lg text-slate-700">
                Low Match Candidates
              </h2>

              <p className="text-4xl font-bold">

{
result.length > 0
? result.filter(
candidate => candidate.score < 50
).length
: 0
}

</p>

            </div>

          </div>

          <div id="upload">

            {/* INPUT SECTION */}

            <div className="grid grid-cols-2 gap-8 mb-10">

              {/* JD */}

              <div className="bg-white rounded-[32px] shadow-lg p-8">

                <h2 className="text-3xl font-bold mb-6">
                  Job Description
                </h2>

                <textarea
  rows="11"
  value={jd}
  onChange={(e)=>setJd(e.target.value)}
  placeholder="Paste Job Description here..."
  className="w-full bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 outline-none resize-none"
>
</textarea>

                <button
                  onClick={analyzeResume}

disabled={!jd.trim() || files.length===0}

className="mt-6 bg-gradient-to-r from-[#A7F3D0] to-[#C4B5FD]
px-10 py-4 rounded-2xl font-semibold shadow-lg
disabled:opacity-50
disabled:cursor-not-allowed"
                >

                  {loading ? "Analyzing..." : "Analyze Resume"}

                </button>

              </div>

              {/* UPLOAD */}

<div className="bg-white rounded-[32px] shadow-lg p-8">

  <h2 className="text-3xl font-bold mb-6">
    Upload Resume
  </h2>

  <label className="border-2 border-dashed border-[#D8B4FE] bg-gradient-to-br from-[#F8FAFC] to-[#F3E8FF] rounded-[28px] min-h-[420px] flex flex-col justify-center items-center cursor-pointer p-8">

    <div className="bg-[#EEE8FF] p-6 rounded-full mb-6">

      <Upload
        size={52}
        className="text-[#7C3AED]"
      />

    </div>

    <h3 className="text-3xl font-bold">
      Upload Resume Files
    </h3>

    <p className="text-slate-500 mt-3">
      Drag & Drop PDF / DOCX Resumes
    </p>

    <input
      type="file"
      multiple
      accept=".pdf,.doc,.docx"
      onChange={(e)=>setFiles([...e.target.files])}
      className="hidden"
    />

    {

      files.length > 0 && (

        <div className="mt-8 w-full max-w-[500px] bg-white rounded-3xl p-6 shadow-xl">

          <h4 className="text-xl font-bold text-[#7C3AED] mb-4">

            Selected Files ({files.length})

          </h4>

          {

            files.map((f,index)=>(

              <div
                key={index}
                className="bg-[#FAF7FF] border rounded-2xl px-5 py-4 mb-3 flex justify-between items-center"
              >

                <div>

                  <p className="font-semibold">
                    ✓ {f.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {(f.size/1024).toFixed(1)} KB
                  </p>

                </div>

                <button

                  onClick={()=>{

                    const updatedFiles =
                    files.filter((_,i)=>i!==index);

                    setFiles(updatedFiles);

                  }}

                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition duration-200"

                >

                  Remove

                </button>

              </div>

            ))

          }

        </div>

      )

    }

  </label>

</div>

</div>

<div id="analytics">

              {/* CHARTS */}

              <div className="grid grid-cols-2 gap-8 mb-10">

                {/* BAR CHART */}

                <div className="bg-white rounded-[32px] shadow-lg p-8">

                  <h2 className="text-2xl font-bold mb-6">
                    Candidate Scores
                  </h2>

                  <div className="w-full h-[360px]">

                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >

                      <BarChart
                        data={scoreData}
                        margin={{
                          top: 20,
                          right: 20,
                          left: 0,
                          bottom: 80
                        }}
                      >

                        <XAxis
                          dataKey="name"
                          interval={0}
                          angle={-25}
                          textAnchor="end"
                          height={90}
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) =>

                            value.length > 16
                              ? value.substring(0, 16) + "..."
                              : value

                          }
                        />

                        <YAxis />

                        <Tooltip />

                        <Bar
                          dataKey="score"
                          fill="#C4B5FD"
                          radius={[10, 10, 0, 0]}
                        />

                      </BarChart>

                    </ResponsiveContainer>

                  </div>

                </div>

                {/* PIE CHART */}

                <div className="bg-white rounded-[32px] shadow-lg p-8">

                  <h2 className="text-2xl font-bold mb-6">
                    Candidate Quality
                  </h2>

                  <div className="w-full h-[360px]">

                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >

                      <PieChart>

                        <Pie
                          data={pieData}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          outerRadius={110}
                          label
                        >

                          {
                            pieData.map((entry, index) => (

                              <Cell
                                key={index}
                                fill={COLORS[index]}
                              />

                            ))
                          }

                        </Pie>

                        <Tooltip />

                      </PieChart>

                    </ResponsiveContainer>

                  </div>

                </div>

              </div>

              {/* LIVE RESULT */}

              {

                result.length > 0 && (

                  <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">

                    <h2 className="text-2xl font-bold mb-6">
                      Live Analysis Result
                    </h2>

                    <p className="mb-2">
                      <strong>Top Candidate:</strong> {result[0].candidate}
                    </p>

                    <p className="mb-2">
                      <strong>Top Score:</strong> {result[0].score}%
                    </p>

                    <p>
                      <strong>Total Candidates:</strong> {result.length}
                    </p>

                  </div>

                )

              }

              {/* TABLE */}

<div id="ranking">

  <div className="bg-white rounded-[32px] shadow-xl p-10 border border-slate-100">

    <div className="flex justify-between items-center mb-8">

      <h2 className="text-3xl font-bold text-slate-800">
        Candidate Ranking
      </h2>

      <div className="text-slate-500 text-sm">
        Sorted by Score ↓
      </div>

    </div>

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="bg-[#F8FAFC] text-slate-700">

            <th className="p-5 rounded-l-2xl">Rank</th>
            <th className="p-5">Candidate</th>
            <th className="p-5">Score</th>
            <th className="p-5">Skills Match</th>
            <th className="p-5 rounded-r-2xl">Missing Skills</th>

          </tr>

        </thead>

        <tbody>

          {result.map((candidate,index)=>(

            <tr
              key={index}
              className="border-b hover:bg-slate-50 transition duration-200"
            >

              <td className="p-5 font-bold text-[#7C3AED]">
                #{index+1}
              </td>

              <td className="p-5 font-medium text-slate-800">
                {candidate.candidate}
              </td>

              <td className="p-5">

                <div className="flex items-center gap-3">

                  <div className="w-[120px] bg-slate-200 rounded-full h-3">

                    <div
                      className="bg-[#7C3AED] h-3 rounded-full"
                      style={{
                        width:`${candidate.score}%`
                      }}
                    ></div>

                  </div>

                  <span className="font-semibold text-slate-800">
                    {candidate.score}%
                  </span>

                </div>

              </td>

              <td className="p-5 text-green-600 font-medium">
                Python, SQL
              </td>

              <td className="p-5 text-red-500 font-medium">
                Docker
              </td>

            </tr>

          ))}

        </tbody>

</table>

</div> {/* overflow-x-auto */}

</div> {/* ranking card */}

</div> {/* ranking */}

</div> {/* analytics */}

</div> {/* upload */}

</div> {/* dashboard */}

</div> {/* MAIN */}

</div> 


);

}

export default App;