const destinationCol = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "name",
    headerName: "Name",
    width: 180,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 220,
    editable: true,
  },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-400">
        <img
          src={params.row.image}
          alt={"destination-image"}
          className="w-full h-full object-contain"
        />
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => (
      <div
        className={`py-1 px-2 rounded-md ${
          params.row.status === "draft"
            ? "bg-slate-500"
            : params.row.status === "published"
            ? "bg-green-500"
            : "bg-yellow-500"
        } text-white`}
      >
        {params.row.status}
      </div>
    ),
  },
];
const tourCol = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-400">
        <img
          src={params.row.image}
          alt={"destination-image"}
          className="w-full h-full object-contain"
        />
      </div>
    ),
  },
  {
    field: "destination",
    headerName: "Destination",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <div
        className={`py-1 px-2 rounded-md ${
          params.row.status === "draft"
            ? "bg-slate-500"
            : params.row.status === "published"
            ? "bg-green-500"
            : "bg-yellow-500"
        } text-white`}
      >
        {params.row.status}
      </div>
    ),
  },
];

const blogCol = [
  { field: "id", headerName: "ID", width: 50 },

  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
  },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-400">
        <img
          src={params.row.image}
          alt={"destination-image"}
          className="w-full h-full object-contain"
        />
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <div
        className={`py-1 px-2 rounded-md ${
          params.row.status === "draft"
            ? "bg-slate-500"
            : params.row.status === "published"
            ? "bg-green-500"
            : "bg-yellow-500"
        } text-white`}
      >
        {params.row.status}
      </div>
    ),
  },
]
export { destinationCol,tourCol,blogCol };
