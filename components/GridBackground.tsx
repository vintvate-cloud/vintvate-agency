export default function GridBackground() {
    return (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <div
                className="absolute inset-0 w-full h-full opacity-[0.2]"
                style={{
                    backgroundImage: `linear-gradient(var(--grid-color) 2px, transparent 2px), linear-gradient(90deg, var(--grid-color) 2px, transparent 2px)`,
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
}