export function TeacherStatus({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive
          ? "bg-green-500/10 text-green-500"
          : "bg-yellow-500/10 text-yellow-500"
      }`}
    >
      <div
        className={`w-1 h-1 rounded-full mr-1.5 ${
          isActive ? "bg-green-500" : "bg-yellow-500"
        }`}
      />
      {isActive ? "Active" : "Inactive"}
    </div>
  );
} 