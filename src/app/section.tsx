import { Container } from "./ui/container";

export function Section({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-12">
      <Container>
        {(title || description) && (
          <header className="mb-7 space-y-2">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            {description && <p className="text-sm text-zinc-600">{description}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}

